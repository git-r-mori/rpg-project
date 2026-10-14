import { SKILLS_PER_CHARACTER } from '../character';
import type { CharacterClass, Skill, Stats } from '../character';

/**
 * Chooses the skills a character learns from its class's candidates.
 *
 * @param stats - The character's stats.
 * @param characterClass - The chosen class. Its `skillIds` are the candidates in tie-break order.
 * @param skills - All known skills.
 * @returns Up to `SKILLS_PER_CHARACTER` skills whose stats are highest, highest first;
 * candidates earlier in `skillIds` come first on a tie.
 * @throws {Error} When a candidate id is not in `skills`.
 */
export function chooseSkills(
  stats: Stats,
  characterClass: CharacterClass,
  skills: readonly Skill[],
): Skill[] {
  const candidates = characterClass.skillIds.map((id) => {
    const skill = skills.find((candidate) => candidate.id === id);
    if (skill === undefined) {
      throw new Error(`Unknown skill ${id} in class ${characterClass.id}`);
    }
    return skill;
  });
  return candidates
    .toSorted((a, b) => stats[b.stat] - stats[a.stat])
    .slice(0, SKILLS_PER_CHARACTER);
}
