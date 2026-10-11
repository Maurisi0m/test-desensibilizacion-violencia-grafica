import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  saveEvaluation, getAllEvaluations, getEvaluationById, deleteEvaluation,
  generateCsvExport, authenticateUser, verifySessionToken, logoutSession
} from './db.js';
import { evaluateSubmission, computeGroupStatistics } from './psychometrics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware de Autenticación para el Equipo de Investigación
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso no autorizado. Inicia sesión como equipo de investigación.' });
  }

  const token = authHeader.split(' ')[1];
  const session = verifySessionToken(token);
  if (!session) {
    return res.status(401).json({ error: 'Sesión expirada o inválida. Por favor ingresa nuevamente.' });
  }

  req.adminUser = session.username;
  next();
}

// =========================================================================
// RUTAS DE AUTENTICACIÓN (LOGIN EQUIPO LA SALLE)
// =========================================================================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Debes proporcionar usuario y contraseña.' });
  }

  const session = authenticateUser(username.trim(), password);
  if (!session) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
  }

  res.json({
    success: true,
    token: session.token,
    username: session.username,
    expires_at: session.expires_at
  });
});

app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ authenticated: false });
  }

  const token = authHeader.split(' ')[1];
  const session = verifySessionToken(token);
  if (!session) {
    return res.json({ authenticated: false });
  }

  res.json({ authenticated: true, username: session.username });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    logoutSession(token);
  }
  res.json({ success: true, message: 'Sesión cerrada exitosamente.' });
});

// =========================================================================
// RUTAS PÚBLICAS (ESTUDIANTES / ENCUESTADOS)
// =========================================================================

// Estado del servicio
app.get('/api/health', (req, res) => {
  const records = getAllEvaluations();
  res.json({
    status: 'ok',
    service: 'Plataforma de Investigación Escolar (42 ítems)',
    variable_central: 'Desensibilización a Violencia Gráfica',
    database: 'SQLite v3',
    total_evaluaciones: records.length,
    timestamp: new Date().toISOString()
  });
});

// Registro de cuestionario de estudiante (PÚBLICO: no requiere login)
app.post('/api/evaluations', (req, res) => {
  try {
    const { participant, answers } = req.body;
    if (!answers || !Array.isArray(answers) || answers.length !== 42) {
      return res.status(400).json({
        error: 'Petición inválida. Se requieren exactamente 42 respuestas válidas correspondientes a los 5 bloques.'
      });
    }

    const evaluationResult = evaluateSubmission(participant || {}, answers);
    const saved = saveEvaluation(evaluationResult);

    // Retorna el resultado individual para que el estudiante vea su informe sin acceder al historial ajeno
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error al registrar evaluación:', error);
    res.status(500).json({ error: error.message || 'Error interno del servidor.' });
  }
});

// Consultar resultado individual por ID
app.get('/api/evaluations/:id', (req, res) => {
  try {
    const item = getEvaluationById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Evaluación no encontrada.' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error al obtener evaluación por ID:', error);
    res.status(500).json({ error: error.message || 'Error al consultar evaluación.' });
  }
});

// =========================================================================
// RUTAS PROTEGIDAS (SOLO EQUIPO DE INVESTIGACIÓN CON SESIÓN ACTIVA)
// =========================================================================

// Listar todas las evaluaciones registradas
app.get('/api/evaluations', requireAdminAuth, (req, res) => {
  try {
    const list = getAllEvaluations();
    res.json(list);
  } catch (error) {
    console.error('Error al consultar lista de evaluaciones:', error);
    res.status(500).json({ error: error.message || 'Error al obtener historial.' });
  }
});

// Análisis estadístico grupal con selección de muestra
app.post('/api/stats/group', requireAdminAuth, (req, res) => {
  try {
    const { ids } = req.body;
    let records = getAllEvaluations();

    if (Array.isArray(ids) && ids.length > 0) {
      const idSet = new Set(ids.map(Number));
      records = records.filter(r => idSet.has(r.id));
    }

    const stats = computeGroupStatistics(records);
    res.json(stats);
  } catch (error) {
    console.error('Error al calcular estadísticas grupales:', error);
    res.status(500).json({ error: error.message || 'Error al procesar estadísticas.' });
  }
});

// Exportar matriz a CSV para SPSS / R / Excel
app.post('/api/export/csv', requireAdminAuth, (req, res) => {
  try {
    const { ids } = req.body;
    const csvContent = generateCsvExport(Array.isArray(ids) && ids.length > 0 ? ids : null);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="matriz_investigacion_violencia_grafica_42items.csv"');
    res.send(csvContent);
  } catch (error) {
    console.error('Error al generar CSV:', error);
    res.status(500).json({ error: error.message || 'Error al exportar matriz de datos.' });
  }
});

// Eliminar un registro de evaluación
app.delete('/api/evaluations/:id', requireAdminAuth, (req, res) => {
  try {
    const success = deleteEvaluation(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Evaluación no encontrada para eliminar.' });
    }
    res.json({ success: true, message: 'Evaluación eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar evaluación:', error);
    res.status(500).json({ error: error.message || 'Error al eliminar.' });
  }
});

// Servir frontend compilado en producción
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor de Investigación Escolar activo en http://0.0.0.0:${PORT}`);
});
