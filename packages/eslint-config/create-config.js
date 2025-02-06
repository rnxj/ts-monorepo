import antfu from "@antfu/eslint-config";

export default function createConfig(options, ...userConfigs) {
  return antfu({
    type: "app",
    typescript: true,
    formatters: {
      css: true,
      html: true,
      markdown: "prettier",
      json: true,
      graphql: true,
      yaml: true,
    },
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ...options,
  }, {
    rules: {
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": ["error", {
        tsconfigRootDir: ".",
      }],
      "unicorn/filename-case": ["error", {
        case: "kebabCase",
        ignore: ["README.md"],
      }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
      "style/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "*", next: "export" },
      ],
      "lines-between-class-members": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "eol-last": ["error", "always"],
    },
  }, ...userConfigs);
}
