const baseRules = {
  'semi': [
    'warn',
    'never',
  ],
  'indent': [
    'warn',
    2,
    {
      'SwitchCase': 1,
      'VariableDeclarator': 'first',
      'outerIIFEBody': 1,
      'FunctionDeclaration': {
        'parameters': 1,
        'body': 1,
      },
      'FunctionExpression': {
        'parameters': 1,
        'body': 1,
      },
      'CallExpression': {
        'arguments': 1,
      },
      'ArrayExpression': 1,
      'ObjectExpression': 1,
      'ImportDeclaration': 1,
      'flatTernaryExpressions': false,
      'ignoredNodes': [
        'JSXElement',
        'JSXElement > *',
        'JSXAttribute',
        'JSXIdentifier',
        'JSXNamespacedName',
        'JSXMemberExpression',
        'JSXSpreadAttribute',
        'JSXExpressionContainer',
        'JSXOpeningElement',
        'JSXClosingElement',
        'JSXFragment',
        'JSXOpeningFragment',
        'JSXClosingFragment',
        'JSXText',
        'JSXEmptyExpression',
        'JSXSpreadChild',
      ],
      'ignoreComments': false,
    },
  ],
  'linebreak-style': [
    'error',
    'unix',
  ],
  'no-plusplus': 'off',
  'object-curly-newline': [
    'error',
    {
      'ObjectExpression': {
        'minProperties': 6,
        'multiline': true,
        'consistent': true,
      },
      'ObjectPattern': {
        'minProperties': 6,
        'multiline': true,
        'consistent': true,
      },
      'ImportDeclaration': {
        'minProperties': 6,
        'multiline': true,
        'consistent': true,
      },
      'ExportDeclaration': {
        'minProperties': 6,
        'multiline': true,
        'consistent': true,
      },
    },
  ],
  'no-use-before-define': [
    'error',
    {
      'functions': false,
      'classes': false,
      'variables': true,
    },
  ],
  'prefer-const': 'error',
  'import/prefer-default-export': 'off',
  'import/no-named-as-default': 'off',
  'no-console': 'off',
  'consistent-return': 'off',
  'no-shadow': 'off',
  'import/order': [
    'warn',
    {
      'newlines-between': 'always',
      'groups': [
        [
          'builtin',
          'external',
        ],
        'parent',
        'sibling',
        'index',
      ],
    },
  ],
  'import/no-deprecated': 'warn',
  'no-duplicate-imports': 'off',
  'import/no-duplicates': 'error',
}

const typescriptRules = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-non-null-assertion': 'off',
  'indent': 'off',
  '@typescript-eslint/indent': [
    'warn',
    2,
    {
      'SwitchCase': 1,
      'VariableDeclarator': 'first',
      'outerIIFEBody': 1,
      'FunctionDeclaration': {
        'parameters': 1,
        'body': 1,
      },
      'FunctionExpression': {
        'parameters': 1,
        'body': 1,
      },
      'CallExpression': {
        'arguments': 1,
      },
      'ArrayExpression': 1,
      'ObjectExpression': 1,
      'ImportDeclaration': 1,
      'flatTernaryExpressions': false,
      'ignoredNodes': [
        'JSXElement',
        'JSXElement > *',
        'JSXAttribute',
        'JSXIdentifier',
        'JSXNamespacedName',
        'JSXMemberExpression',
        'JSXSpreadAttribute',
        'JSXExpressionContainer',
        'JSXOpeningElement',
        'JSXClosingElement',
        'JSXFragment',
        'JSXOpeningFragment',
        'JSXClosingFragment',
        'JSXText',
        'JSXEmptyExpression',
        'JSXSpreadChild',
      ],
      'ignoreComments': false,
    },
  ],
  '@typescript-eslint/no-shadow': 'off',
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': [
    'error',
    {
      'functions': false,
      'classes': false,
      'variables': true,
      'enums': true,
      'typedefs': true,
      'ignoreTypeReferences': true,
    },
  ],
  "@typescript-eslint/consistent-type-imports": "error",
}

const reactRules = {
  'react/react-in-jsx-scope': 'off',
  'react/jsx-indent': [
    'warn',
    2,
  ],
  'react/jsx-indent-props': [
    'warn',
    'first',
  ],
  'react/prop-types': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-key': 'warn',
  'react/jsx-no-literals': [
    'warn',
    {
      'noStrings': true,
      'ignoreProps': true,
      'allowedStrings': [
        ':',
        '|',
        '(',
        ')',
      ],
    },
  ],
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'error',
  'react/display-name': 'error',
  'jsx-a11y/anchor-is-valid': 'off',
  'jsx-a11y/media-has-caption': 'off',
  'import/order': [
    'warn',
    {
      'newlines-between': 'always',
      'groups': [
        [
          'builtin',
          'external',
        ],
        'parent',
        'sibling',
        'index',
      ],
      'pathGroups': [
        {
          'pattern': '**/*.{css|scss|sass}',
          'group': 'index',
          'position': 'after',
        },
      ],
    },
  ],
}

module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
    'import/ignore': [
      '\\.(scss|css)$',
    ],
    'import/parsers': {
      'astro-eslint-parser': ['.astro'],
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    },
    'react': {
      'pragma': 'h',
      'version': '16.0',
    },
  },
  rules: baseRules,
  overrides: [
    // Astro
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    // Javascript and JSX
    {
      files: ['*.js'],
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:promise/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
      ],
      env: {
        'es2020': true,
        'browser': true,
        'shared-node-browser': true,
      },
      parserOptions: {
        ecmaVersion: 2022,
      },
      rules: baseRules,
    },
    {
      files: ['*.jsx'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/recommended',
        'plugin:import/react',
        'plugin:jsx-a11y/recommended',
        'plugin:promise/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react-hooks/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2022,
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        'es2020': true,
        'browser': true,
        'shared-node-browser': true,
      },
      rules: {
        ...baseRules,
        ...reactRules,
      },
    },
    // Typescript
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        ...baseRules,
        ...typescriptRules,
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
      },
    },
    {
      files: ['*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['react', '@typescript-eslint'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        ...baseRules,
        ...reactRules,
        ...typescriptRules,
      },
    },
    // Astro script tags
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ['**/*.astro/*.js', '*.astro/*.js'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        ...baseRules,
        ...typescriptRules,
      },
    },
  ],
}
