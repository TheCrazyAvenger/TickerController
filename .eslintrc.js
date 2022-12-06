module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prefer-arrow', 'import'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        semi: 0,
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'dot-notation': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'no-unused-vars': 'off',
        'no-trailing-spaces': 'off',
        'prettier/prettier': ['warn', {endOfLine: 'auto'}],
        'jsx-quotes': 'off',
        'react-native/no-inline-styles': 'off',
        'spaced-comment': 'warn',
        'import/no-default-export': 'off',
        'prefer-arrow/prefer-arrow-functions': [
          'warn',
          {
            disallowPrototype: true,
            singleReturnOnly: false,
            classPropertiesAllowed: false,
          },
        ],
      },
    },
  ],
};
