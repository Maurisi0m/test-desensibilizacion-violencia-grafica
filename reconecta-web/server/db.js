import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'reconecta.db');
const db = new DatabaseSync(dbPath);

// Initialize schema
db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alias TEXT NOT NULL,
    age INTEGER NOT NULL,
    cohort TEXT NOT NULL,
    evaluated_at TEXT NOT NULL,
    raw_total INTEGER NOT NULL,
    global_index REAL NOT NULL,
    passive_index REAL NOT NULL,
    active_index REAL NOT NULL,
    physiological_index REAL NOT NULL,
    cognitive_index REAL NOT NULL,
    severity_level TEXT NOT NULL,
    severity_title TEXT NOT NULL,
    diff_analysis TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS evaluation_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evaluation_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    dimension TEXT NOT NULL,
    question_text TEXT NOT NULL,
    score INTEGER NOT NULL,
    score_label TEXT NOT NULL,
    FOREIGN KEY(evaluation_id) REFERENCES evaluations(id) ON DELETE CASCADE
  );
`);

export function saveEvaluation(data) {
  const insertEval = db.prepare(`
    INSERT INTO evaluations (
      alias, age, cohort, evaluated_at, raw_total, global_index,
      passive_index, active_index, physiological_index, cognitive_index,
      severity_level, severity_title, diff_analysis
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = insertEval.run(
    data.alias,
    data.age,
    data.cohort,
    data.evaluated_at || new Date().toISOString(),
    data.raw_total,
    data.global_index,
    data.passive_index,
    data.active_index,
    data.physiological_index,
    data.cognitive_index,
    data.severity_level,
    data.severity_title,
    data.diff_analysis
  );

  const evaluationId = result.lastInsertRowid;

  if (Array.isArray(data.answers) && data.answers.length > 0) {
    const insertAnswer = db.prepare(`
      INSERT INTO evaluation_answers (
        evaluation_id, question_id, dimension, question_text, score, score_label
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const ans of data.answers) {
      insertAnswer.run(
        evaluationId,
        ans.question_id,
        ans.dimension,
        ans.question_text,
        ans.score,
        ans.score_label
      );
    }
  }

  return getEvaluationById(evaluationId);
}

export function getAllEvaluations() {
  const stmt = db.prepare(`
    SELECT id, alias, age, cohort, evaluated_at, raw_total, global_index,
           passive_index, active_index, physiological_index, cognitive_index,
           severity_level, severity_title, diff_analysis, created_at
    FROM evaluations
    ORDER BY id DESC
  `);
  return stmt.all();
}

export function getEvaluationById(id) {
  const evalStmt = db.prepare(`
    SELECT * FROM evaluations WHERE id = ?
  `);
  const row = evalStmt.get(id);
  if (!row) return null;

  const answersStmt = db.prepare(`
    SELECT question_id, dimension, question_text, score, score_label
    FROM evaluation_answers
    WHERE evaluation_id = ?
    ORDER BY question_id ASC
  `);
  row.answers = answersStmt.all(id);
  return row;
}

export function deleteEvaluation(id) {
  const stmt = db.prepare(`DELETE FROM evaluations WHERE id = ?`);
  const res = stmt.run(id);
  return res.changes > 0;
}

export default db;
