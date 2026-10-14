import type { DiagnosisData } from '../features/diagnosis';
import { CHARACTER_CLASSES } from './classes';
import { QUESTIONS } from './questions';
import { SKILLS } from './skills';

/** The questions, classes, and skills of the game, bundled for `diagnose`. */
export const DIAGNOSIS_DATA: DiagnosisData = {
  questions: QUESTIONS,
  classes: CHARACTER_CLASSES,
  skills: SKILLS,
};
