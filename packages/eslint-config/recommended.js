module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: './tsconfig.json'
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['unicorn'],
  root: true,
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    '@typescript-eslint/array-type': ['error', {default: 'array-simple', readonly: 'array-simple'}],
    '@typescript-eslint/prefer-for-of': ['error'],
    '@typescript-eslint/prefer-includes': ['error'],
    '@typescript-eslint/naming-convention': [
      'error',
      {selector: 'default', format: ['camelCase', 'PascalCase']},
      {selector: 'classProperty', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow'},
      {selector: ['typeLike'], format: ['PascalCase']},
      {selector: ['variableLike'], format: ['PascalCase', 'camelCase']},
      {selector: 'parameter', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow'},
      {selector: ['objectLiteralProperty', 'objectLiteralMethod', 'typeProperty', 'typeMethod'], format: null},
      {selector: 'classProperty', modifiers: ['static'], format: ['UPPER_CASE']},
      {selector: 'enumMember', format: ['UPPER_CASE']},
      {selector: 'variable', modifiers: ['const', 'global'], types: ['boolean', 'string', 'number', 'array'], format: ['UPPER_CASE']},
      {selector: 'variable', modifiers: ['const', 'global'], format: ['UPPER_CASE', 'PascalCase', 'camelCase']}
    ],
    'curly': ['error', 'all'],
    'eqeqeq': [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false
        }
      }
    ],
    'lines-between-class-members': [
      'error',
      'always',
      {
        'exceptAfterSingleLine': true
      }
    ],
    'no-restricted-syntax': [
      'error',
      {
        message: 'No relative import',
        selector: 'ImportDeclaration[source.value=/^\\..\\..*/]'
      },
      {
        message: 'Reuse utils or re-export lodash in utils then use it indirectly',
        selector: 'ImportDeclaration[source.value=/^lodash/]'
      },
      {
        message: 'Wrong import prisma client, it should be @prisma/client',
        selector: 'ImportDeclaration[source.value=/^\\.prisma/]'
      }
    ],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: 'function'
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: 'return'
      },
      {
        blankLine: 'always',
        prev: 'multiline-expression',
        next: 'return'
      },
      {
        blankLine: 'always',
        prev: 'multiline-block-like',
        next: '*'
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        bracketSpacing: false,
        printWidth: 120,
        arrowParens: 'always',
        // Prevent Windows throwing errors
        endOfLine: 'auto'
      }
    ],
    'unicorn/no-array-for-each': ['error'],
    'unicorn/no-instanceof-array': ['error'],
    'unicorn/no-lonely-if': ['error'],
    'unicorn/prefer-default-parameters': ['error'],
    'unicorn/prefer-set-has': ['error'],
    'unicorn/prefer-string-starts-ends-with': ['error'],
    'unicorn/prefer-string-trim-start-end': ['error']
  }
}
