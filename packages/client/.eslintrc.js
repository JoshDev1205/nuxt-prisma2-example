module.exports = {
  parserOptions: {
    'warnOnUnsupportedTypeScriptVersion': false,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
  ],
  rules: {
    "vue/max-attributes-per-line": "off",
    'comma-dangle': [1, 'always-multiline'],
    'semi': [1, 'always'],
    'indent': ['error', 2],
    'no-console': 'off'
  },
}
