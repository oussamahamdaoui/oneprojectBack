module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['jest', 'import'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
  },
};
