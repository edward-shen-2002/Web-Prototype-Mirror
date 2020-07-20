module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  //   extends: ['airbnb-base', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'react/display-name': 'warn',
    'react/jsx-key': 'warn',
    'no-prototype-builtins': 'warn',
    'no-class-assign': 'warn',
  },
};
