import type { Character, CharacterClass, DiagnosisData, Skill, Stats } from '@rpg/domain';

/** A diagnosed character with its class and skills resolved for display. */
export type CharacterView = {
  characterClass: CharacterClass;
  stats: Stats;
  skills: Skill[];
};

/**
 * Resolves the class and skill ids of a character to their data.
 *
 * @param character - A diagnosed character.
 * @param data - The game data the character was diagnosed against.
 * @returns The class, the stats as given, and the skills in the order of `character.skillIds`.
 * @throws {Error} When the class or a skill id is not in `data`.
 */
export function toCharacterView(character: Character, data: DiagnosisData): CharacterView {
  const characterClass = data.classes.find(({ id }) => id === character.classId);
  if (characterClass === undefined) {
    throw new Error(`Unknown class: ${character.classId}`);
  }
  const skills = character.skillIds.map((skillId) => {
    const skill = data.skills.find(({ id }) => id === skillId);
    if (skill === undefined) {
      throw new Error(`Unknown skill: ${skillId}`);
    }
    return skill;
  });
  return { characterClass, stats: character.stats, skills };
}
