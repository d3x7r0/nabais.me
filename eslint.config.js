import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginAstro from 'eslint-plugin-astro'
import perfectionist from 'eslint-plugin-perfectionist'
import astroParser from 'astro-eslint-parser'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dev-dist', '.astro/**', 'eslint.config.js', 'src/env.d.ts']),

  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],

  stylistic.configs.customize({
    blockSpacing: true,
    braceStyle: '1tbs',
    commaDangle: 'always-multiline',
    jsx: true,
  }),

  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,mts,astro}'],
    rules: {
      curly: ['error', 'all'],
      'object-shorthand': ['error', 'always', {
        avoidQuotes: true,
        avoidExplicitReturnArrows: true,
        ignoreConstructors: false
      }],

      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/no-unresolved': ['error', { ignore: ['^astro:'] }],
      'import/no-anonymous-default-export': ['error', {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowLiteral: false,
        allowObject: false,
      }],
    },
  },

  {
    files: ['**/*.{js,jsx,mjs}'],
    extends: [
      js.configs.recommended,
      importPlugin.flatConfigs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      perfectionist.configs['recommended-alphabetical']
    ],
    settings: {
      perfectionist: { type: 'alphabetical' },
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
      // Restored pattern: ignores variables starting with _ or Uppercase constants
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^[A-Z_]',
        caughtErrorsIgnorePattern: '^[A-Z_]',
        destructuredArrayIgnorePattern: '^[A-Z_]',
      }],

      'perfectionist/sort-classes': ['error', { type: 'unsorted' }],
      'perfectionist/sort-objects': ['error', { groups: ['property', 'method', 'unknown'] }],
      'perfectionist/sort-imports': [
        'error',
        { groups: [['external', 'builtin'], ['side-effect-style', 'side-effect'], 'parent', 'sibling', 'index', 'unknown'] },
      ],

      '@stylistic/jsx-max-props-per-line': ['error', { maximum: { single: 2, multi: 1 } }],
    },
  },

  {
    files: ['**/*.{ts,tsx,mts,astro}'],
    extends: [
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      perfectionist.configs['recommended-alphabetical'],
    ],
    settings: {
      perfectionist: { type: 'alphabetical' },
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^[A-Z_]',
        caughtErrorsIgnorePattern: '^[A-Z_]',
        destructuredArrayIgnorePattern: '^[A-Z_]',
      }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports'
      }],

      'perfectionist/sort-classes': ['error', { type: 'unsorted' }],
      'perfectionist/sort-interfaces': ['error', { groups: ['property', 'method', 'unknown'] }],
      'perfectionist/sort-object-types': ['error', { groups: ['property', 'method', 'unknown'] }],
      'perfectionist/sort-union-types': ['error', { groups: ['unknown', 'nullish'] }],
      'perfectionist/sort-objects': ['error', { groups: ['property', 'method', 'unknown'] }],
      'perfectionist/sort-imports': [
        'error',
        { groups: ['type', ['external', 'builtin'], ['side-effect-style', 'side-effect'], 'parent', 'sibling', 'index', 'unknown'] },
      ],

      '@stylistic/jsx-max-props-per-line': ['error', { maximum: { single: 2, multi: 1 } }],
    },
  },

  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      '@stylistic/ts/indent': 'off',
      '@stylistic/jsx-tag-spacing': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',
    },
  },

  {
    files: ['vite.config.ts'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
])
