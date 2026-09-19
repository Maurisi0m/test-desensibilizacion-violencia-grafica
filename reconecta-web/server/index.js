import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { saveEvaluation, getAllEvaluations, getEvaluationById, deleteEvaluation } from './db.js';
import { evaluateSubmission } from './psychometrics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  const records = getAllEvaluations();
  res.json({
    status: 'ok',
    service: 'ReConecta Web API',
    database: 'SQLite Embedded',
    total_evaluations: records.length,
    timestamp: new Date().toISOString()
  });
});

// Submit a new test evaluation
app.post('/api/evaluations', (req, res) => {
  try {
    const { alias, age, answers } = req.body;
    if (!answers || !Array.isArray(answers) || answers.length !== 20) {
      return res.status(400).json({
        error: 'Petición inválida. Se requieren exactamente 20 respuestas.'
      });
    }

    // Compute psychometrics
    const result = evaluateSubmission(alias, age, answers);

    // Save to SQLite
    const saved = saveEvaluation(result);

    // Return combined result with constructs and DB ID
    res.status(201).json({
      ...result,
      id: saved.id,
      created_at: saved.created_at
    });
  } catch (error) {
    console.error('Error al evaluar y guardar test:', error);
    res.status(500).json({ error: error.message || 'Error interno del servidor.' });
  }
});

// Get all evaluations (History)
app.get('/api/evaluations', (req, res) => {
  try {
    const records = getAllEvaluations();
    res.json(records);
  } catch (error) {
    console.error('Error al consultar evaluaciones:', error);
    res.status(500).json({ error: 'Error al consultar la base de datos.' });
  }
});

// Get specific evaluation by ID (with 20 question breakdown)
app.get('/api/evaluations/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const record = getEvaluationById(id);
    if (!record) {
      return res.status(404).json({ error: 'Evaluación no encontrada.' });
    }
    res.json(record);
  } catch (error) {
    console.error('Error al consultar evaluación individual:', error);
    res.status(500).json({ error: 'Error interno al consultar el registro.' });
  }
});

// Delete an evaluation
app.delete('/api/evaluations/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = deleteEvaluation(id);
    if (!success) {
      return res.status(404).json({ error: 'Evaluación no encontrada o ya eliminada.' });
    }
    res.json({ success: true, message: `Evaluación #${id} eliminada correctamente.` });
  } catch (error) {
    console.error('Error al eliminar evaluación:', error);
    res.status(500).json({ error: 'Error al eliminar el registro.' });
  }
});

// Serve static frontend in production
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`ReConecta Web Server activo en: http://localhost:${PORT}`);
  console.log(`Base de datos SQLite: server/data/reconecta.db`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`===================================================`);
});
