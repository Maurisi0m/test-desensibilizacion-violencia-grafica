import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'reconecta.db');
const db = new DatabaseSync(dbPath);

// Inicializar esquema relacional para investigación de 42 reactivos y autenticación
db.exec(`
  PRAGMA foreign_keys = ON;

  -- Tabla de usuarios de investigación
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabla de sesiones activas
  CREATE TABLE IF NOT EXISTS admin_sessions (
    token TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    expires_at DATETIME NOT NULL
  );

  -- Tabla principal de evaluaciones (42 reactivos, 5 bloques)
  CREATE TABLE IF NOT EXISTS evaluations_v3 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alias TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL,
    school_grade TEXT NOT NULL,
    screen_hours TEXT NOT NULL,
    evaluated_at TEXT NOT NULL,
    profile_name TEXT NOT NULL,
    profile_desc TEXT NOT NULL,
    idx_central_des REAL NOT NULL,
    idx_exp REAL NOT NULL,
    idx_nor REAL NOT NULL,
    idx_agr REAL NOT NULL,
    idx_rel REAL NOT NULL,
    payload_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabla de respuestas ítem por ítem
  CREATE TABLE IF NOT EXISTS evaluation_answers_v3 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evaluation_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    block TEXT NOT NULL,
    dimension TEXT NOT NULL,
    question_text TEXT NOT NULL,
    score INTEGER NOT NULL,
    score_label TEXT NOT NULL,
    FOREIGN KEY(evaluation_id) REFERENCES evaluations_v3(id) ON DELETE CASCADE
  );
`);

// Función para hashear contraseñas
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'S@lleResearch2026').digest('hex');
}

// Inicializar usuario admin por defecto: equiposalle / Lasalle123.
(function initDefaultAdmin() {
  const check = db.prepare(`SELECT * FROM admin_users WHERE username = 'equiposalle'`).get();
  const pwdHash = hashPassword('Lasalle123.');
  if (!check) {
    db.prepare(`INSERT INTO admin_users (username, password_hash) VALUES (?, ?)`).run('equiposalle', pwdHash);
  } else if (check.password_hash !== pwdHash) {
    db.prepare(`UPDATE admin_users SET password_hash = ? WHERE username = 'equiposalle'`).run(pwdHash);
  }
})();

export function authenticateUser(username, password) {
  const user = db.prepare(`SELECT * FROM admin_users WHERE username = ?`).get(username);
  if (!user) return null;

  const inputHash = hashPassword(password);
  if (user.password_hash !== inputHash) return null;

  // Generar token de sesión seguro (validez 7 días)
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  db.prepare(`INSERT INTO admin_sessions (token, username, expires_at) VALUES (?, ?, ?)`).run(token, username, expiresAt);
  return { token, username, expires_at: expiresAt };
}

export function verifySessionToken(token) {
  if (!token) return null;
  const session = db.prepare(`SELECT * FROM admin_sessions WHERE token = ?`).get(token);
  if (!session) return null;

  if (new Date(session.expires_at) < new Date()) {
    db.prepare(`DELETE FROM admin_sessions WHERE token = ?`).run(token);
    return null;
  }
  return session;
}

export function logoutSession(token) {
  if (!token) return;
  db.prepare(`DELETE FROM admin_sessions WHERE token = ?`).run(token);
}

// Guardar evaluación de 42 reactivos
export function saveEvaluation(evaluationData) {
  const p = evaluationData.participant || {};
  const b = evaluationData.blocks || {};
  const c = evaluationData.central_score || {};
  const prof = evaluationData.profile || {};

  const insertEval = db.prepare(`
    INSERT INTO evaluations_v3 (
      alias, age, gender, school_grade, screen_hours, evaluated_at,
      profile_name, profile_desc,
      idx_central_des, idx_exp, idx_nor, idx_agr, idx_rel,
      payload_json
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?,
      ?, ?, ?, ?, ?,
      ?
    )
  `);

  const result = insertEval.run(
    p.alias || 'Estudiante',
    p.age || 15,
    p.gender || 'No especificado',
    p.school_grade || 'Secundaria',
    p.screen_hours || '2 a 4 horas',
    p.evaluated_at || new Date().toISOString(),
    prof.name || 'Perfil general',
    prof.description || '',
    c.index ?? b.DES?.index ?? 0,
    b.EXP?.index ?? 0,
    b.NOR?.index ?? 0,
    b.AGR?.index ?? 0,
    b.REL?.index ?? 0,
    JSON.stringify(evaluationData)
  );

  const evaluationId = result.lastInsertRowid;

  if (Array.isArray(evaluationData.answers) && evaluationData.answers.length > 0) {
    const insertAnswer = db.prepare(`
      INSERT INTO evaluation_answers_v3 (
        evaluation_id, question_id, block, dimension, question_text, score, score_label
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const ans of evaluationData.answers) {
      insertAnswer.run(
        evaluationId,
        ans.question_id,
        ans.block || 'DES',
        ans.dimension || '',
        ans.question_text || '',
        ans.score,
        ans.score_label || ''
      );
    }
  }

  return getEvaluationById(evaluationId);
}

export function getAllEvaluations() {
  const stmt = db.prepare(`SELECT * FROM evaluations_v3 ORDER BY created_at DESC`);
  const rows = stmt.all();
  return rows.map(r => {
    try {
      const parsed = JSON.parse(r.payload_json);
      return {
        ...parsed,
        id: r.id,
        created_at: r.created_at
      };
    } catch (e) {
      return {
        id: r.id,
        participant: {
          alias: r.alias,
          age: r.age,
          gender: r.gender,
          school_grade: r.school_grade,
          screen_hours: r.screen_hours,
          evaluated_at: r.evaluated_at
        },
        central_score: { index: r.idx_central_des },
        profile: { name: r.profile_name, description: r.profile_desc },
        created_at: r.created_at
      };
    }
  });
}

export function getEvaluationById(id) {
  const stmt = db.prepare(`SELECT * FROM evaluations_v3 WHERE id = ?`);
  const row = stmt.get(id);
  if (!row) return null;

  try {
    const parsed = JSON.parse(row.payload_json);
    return {
      ...parsed,
      id: row.id,
      created_at: row.created_at
    };
  } catch (e) {
    return null;
  }
}

export function deleteEvaluation(id) {
  const stmt = db.prepare(`DELETE FROM evaluations_v3 WHERE id = ?`);
  const result = stmt.run(id);
  return result.changes > 0;
}

export function generateCsvExport(selectedIds = null) {
  let rows = [];
  if (Array.isArray(selectedIds) && selectedIds.length > 0) {
    const placeholders = selectedIds.map(() => '?').join(',');
    const stmt = db.prepare(`SELECT * FROM evaluations_v3 WHERE id IN (${placeholders}) ORDER BY id ASC`);
    rows = stmt.all(...selectedIds);
  } else {
    const stmt = db.prepare(`SELECT * FROM evaluations_v3 ORDER BY id ASC`);
    rows = stmt.all();
  }

  const headers = [
    'ID', 'Fecha', 'Alias', 'Edad', 'Genero', 'Grado_Escolar', 'Horas_Redes', 'Perfil_Exploratorio',
    'Idx_Central_Desensibilizacion', 'Idx_Bloque1_Exposicion', 'Idx_Bloque3_Normalizacion',
    'Idx_Bloque4_Agresividad', 'Idx_Bloque5_Relaciones'
  ];

  // Columnas Item_1 a Item_42
  for (let i = 1; i <= 42; i++) {
    headers.push(`Item_${i}`);
  }

  const csvLines = [headers.join(',')];

  const getAnswersStmt = db.prepare(`
    SELECT question_id, score FROM evaluation_answers_v3 WHERE evaluation_id = ? ORDER BY question_id ASC
  `);

  for (const r of rows) {
    const answers = getAnswersStmt.all(r.id);
    const answerMap = {};
    for (const a of answers) {
      answerMap[a.question_id] = a.score;
    }

    const line = [
      r.id,
      `"${r.evaluated_at}"`,
      `"${r.alias.replace(/"/g, '""')}"`,
      r.age,
      `"${r.gender}"`,
      `"${r.school_grade}"`,
      `"${r.screen_hours}"`,
      `"${r.profile_name.replace(/"/g, '""')}"`,
      r.idx_central_des,
      r.idx_exp,
      r.idx_nor,
      r.idx_agr,
      r.idx_rel
    ];

    for (let i = 1; i <= 42; i++) {
      line.push(answerMap[i] ?? '');
    }

    csvLines.push(line.join(','));
  }

  return csvLines.join('\n');
}
