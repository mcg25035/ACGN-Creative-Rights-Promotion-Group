module.exports = {
  root: false,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:oxlint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { 
        allowConstantExport: true,
        
      },
    ],
    "semi": [1, "always"],
    "quotes":"off",
    "react/react-in-jsx-scope": "off",
    "camelcase": "warn",
    "object-curly-spacing": [1, "always"],
    "indent": ["warn", 4, {
      "SwitchCase": 1,
      "ignoreComments": true
    }],
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }],
    "keyword-spacing": 1,
    "no-trailing-spaces": 1
  },
  "settings": {
      "react": {
        "version": "detect"
      }
  }
}
