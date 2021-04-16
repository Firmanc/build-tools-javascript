module.exports = {
  env: {
    "browser": true,
    "node": true,
    "jest": true
  },
  extends: [
    '@firmanc/eslint-config-base',
    './rules/react',
    './rules/react-a11y',
    './rules/react-hooks',
  ].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {},
};
