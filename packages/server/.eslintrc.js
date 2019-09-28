module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "comma-dangle": [1, "always-multiline"],
    "semi": [1, "always"],
    "indent": ["error", 2],
    "eol-last": ["error", "always"]
  },
}
