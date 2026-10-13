import { z } from 'zod';

/**
 * Schema for a name passed to {@link greet}.
 *
 * Trims surrounding whitespace, then requires 1 to 32 characters.
 */
export const GreetingNameSchema = z.string().trim().min(1).max(32);

/**
 * Builds a greeting message for the given name.
 *
 * @param name - Display name to greet. Surrounding whitespace is trimmed.
 * @returns The greeting, e.g. `"Hello, World!"`.
 * @throws {ZodError} When the trimmed name is empty or longer than 32 characters.
 */
export function greet(name: string): string {
  const validName = GreetingNameSchema.parse(name);
  return `Hello, ${validName}!`;
}
