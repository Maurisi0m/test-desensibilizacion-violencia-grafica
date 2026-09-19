import { saveEvaluation } from './db.js';
import { evaluateSubmission } from './psychometrics.js';
import { QUESTIONS } from '../src/data/questionBank.js';

// Seed sample evaluation
const answers = QUESTIONS.map((q, idx) => ({
  question_id: q.id,
  dimension: q.dimension,
  question_text: q.adult,
  score: [4, 5, 4, 3, 4, 4, 3, 4, 4, 3, 4, 3, 4, 3, 4, 4, 3, 4, 4, 3][idx]
}));

const result = evaluateSubmission('Valeria Gómez', 22, answers);
const saved = saveEvaluation(result);
console.log('Seed evaluation saved with ID:', saved.id, 'IGD:', saved.global_index + '%');
