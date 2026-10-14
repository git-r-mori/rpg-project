import type { CharacterClass, Skill } from '../features/character';
import type { DiagnosisData } from '../features/diagnosis';
import type { Question } from '../features/questionnaire';

/**
 * Two small questions for diagnosis tests.
 *
 * Possible totals per stat: strength -1 to 3, intelligence 0 to 3, vitality 0 to 1,
 * luck 0 to 1, and agility and dexterity always 0.
 */
export const TEST_QUESTIONS = [
  {
    id: 'q1',
    text: '質問 1',
    options: [
      { id: 'a', text: '選択肢 A', effects: { strength: 2 } },
      { id: 'b', text: '選択肢 B', effects: { intelligence: 2 } },
      { id: 'c', text: '選択肢 C', effects: { luck: 1, strength: -1 } },
    ],
  },
  {
    id: 'q2',
    text: '質問 2',
    options: [
      { id: 'a', text: '選択肢 A', effects: { strength: 1, vitality: 1 } },
      { id: 'b', text: '選択肢 B', effects: { intelligence: 1 } },
      { id: 'c', text: '選択肢 C', effects: {} },
    ],
  },
] satisfies Question[];

/** Skills for diagnosis tests, one or two per stat. */
export const TEST_SKILLS = [
  { id: 'slash', name: '斬撃', description: '斬る。', stat: 'strength' },
  { id: 'guard', name: '防御', description: '守る。', stat: 'vitality' },
  { id: 'dash', name: '疾走', description: '走る。', stat: 'agility' },
  { id: 'lucky-hit', name: '幸運の一撃', description: '当たる。', stat: 'luck' },
  { id: 'spark', name: '火花', description: '燃やす。', stat: 'intelligence' },
  { id: 'study', name: '研究', description: '調べる。', stat: 'intelligence' },
] satisfies Skill[];

/** Test class weighted on strength. */
export const TEST_FIGHTER: CharacterClass = {
  id: 'fighter',
  name: '闘士',
  description: '力で戦う。',
  weights: { strength: 2 },
  skillIds: ['slash', 'guard', 'dash', 'lucky-hit'],
};

/** Test class weighted on intelligence. */
export const TEST_SCHOLAR: CharacterClass = {
  id: 'scholar',
  name: '学者',
  description: '知恵で戦う。',
  weights: { intelligence: 2 },
  skillIds: ['spark', 'study', 'guard', 'lucky-hit'],
};

/** Classes for diagnosis tests, with {@link TEST_FIGHTER} first so it wins ties. */
export const TEST_CLASSES: readonly CharacterClass[] = [TEST_FIGHTER, TEST_SCHOLAR];

/** The test questions, classes, and skills bundled for `diagnose`. */
export const TEST_DATA: DiagnosisData = {
  questions: TEST_QUESTIONS,
  classes: TEST_CLASSES,
  skills: TEST_SKILLS,
};
