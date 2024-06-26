module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@stylistic/recommended-extends'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true, },
    ],
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
    "no-empty-pattern": "warn",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/ban-types": "warn",
    "@stylistic/indent": ["error", 2],
    
  },
}
