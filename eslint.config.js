import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const featureInternalsPattern = {
  group: ['**/features/*/*'],
  message: 'Import other features through their index.ts, not their internal files.',
};

const domainSubpathPattern = {
  group: ['@rpg/domain/*'],
  message: 'Import @rpg/domain from the package root only.',
};

export default defineConfig([
  globalIgnores(['**/dist', '**/coverage', '**/node_modules']),

  js.configs.recommended,
  tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['packages/domain/src/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react', 'react-dom', 'react-router', '@aws-sdk/*', 'node:*'],
              message: '@rpg/domain must not depend on UI, AWS, or Node-specific APIs.',
            },
            { group: ['@rpg/*'], message: '@rpg/domain must not depend on other workspaces.' },
            featureInternalsPattern,
          ],
        },
      ],
    },
  },

  {
    files: ['apps/web/src/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat['recommended-latest'], reactRefresh.configs.vite],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@rpg/backend-*', 'node:*'],
              message: 'web must not depend on backend or Node-specific APIs.',
            },
            domainSubpathPattern,
            featureInternalsPattern,
          ],
        },
      ],
    },
  },

  {
    files: ['**/*.config.{js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
