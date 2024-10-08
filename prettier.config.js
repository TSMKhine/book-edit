/** @type {import("prettier").Options} */

module.exports = {
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: false,
  bracketSpacing: true,
  arrowParens: 'always',
  trailingComma: 'es5',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
};
