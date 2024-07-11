module.exports = {
  extends: [
    './recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error', {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_'
      }
    ]
  }
}
