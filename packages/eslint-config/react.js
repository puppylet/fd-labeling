module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    '@label/eslint-config/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true
  },

  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        extensions: [".ts", ".tsx"],
        moduleDirectory: ["src", "node_modules"]
      },
      node: {
        extensions: [".ts", ".tsx"],
        moduleDirectory: ["src", "node_modules"]
      }
    }
  },
  rules: {
    'import/default': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    'no-console': 'warn',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'unicorn/prefer-string-replace-all': 'error',
    'import/no-default-export': 'off',
    'import/no-unresolved': 'off',
  }
}
