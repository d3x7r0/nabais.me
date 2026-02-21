import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginAstro from 'eslint-plugin-astro'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dev-dist', 'eslint.config.js']),
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  stylistic.configs.customize({
    blockSpacing: true,
    braceStyle: '1tbs',
    commaDangle: 'always-multiline',
    jsx: true,
  }),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      curly: ['error', 'all'],
      'object-shorthand': [
        'error',
        'always',
        {
          avoidQuotes: true,
          avoidExplicitReturnArrows: true,
          ignoreConstructors: false,
        },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      '@stylistic/object-curly-newline': ['warn', {
        ObjectExpression: {
          minProperties: 6,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: 6,
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          minProperties: 6,
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          minProperties: 6,
          multiline: true,
          consistent: true,
        },
      }],
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      importPlugin.flatConfigs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      perfectionist.configs['recommended-alphabetical']
    ],
    settings: {
      perfectionist: {
        type: 'alphabetical',
        partitionByNewLine: true,
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'perfectionist/sort-classes': ['error', {
        type: 'unsorted',
      }],
      'perfectionist/sort-objects': ['error', {
        groups: [
          'property',
          'method',
          'unknown'
        ],
      }],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            ['external', 'builtin'],
            ['side-effect-style', 'side-effect'],
            'parent',
            'sibling',
            'index',
            'unknown',
          ],
        },
      ],
      '@stylistic/jsx-max-props-per-line': ['error', {
        maximum: {
          single: 2,
          multi: 1
        },
      }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      perfectionist.configs['recommended-alphabetical']
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      perfectionist: {
        type: 'alphabetical',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', {
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      }],
      'perfectionist/sort-classes': ['error', {
        type: 'unsorted',
      }],
      'perfectionist/sort-interfaces': ['error', {
        groups: [
          'property',
          'method',
          'unknown'
        ],
      }],
      'perfectionist/sort-object-types': ['error', {
        groups: [
          'property',
          'method',
          'unknown'
        ],
      }],
      'perfectionist/sort-union-types': ['error', {
        groups: ['unknown', 'nullish'],
      }],
      'perfectionist/sort-objects': ['error', {
        groups: [
          'property',
          'method',
          'unknown'
        ],
      }],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            ['external', 'builtin'],
            ['side-effect-style', 'side-effect'],
            'parent',
            'sibling',
            'index',
            'unknown',
          ],
        },
      ],
      '@stylistic/jsx-max-props-per-line': ['error', {
        maximum: {
          single: 2,
          multi: 1
        },
      }],
    },
  },
  {
    files: ['vite.config.ts'],
    rules: {
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: true,
      }],
    },
  },
])
