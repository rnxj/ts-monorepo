export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "init",
        "fix",
        "refactor",
        "revert",
        "style",
        "test",
        "add",
        "remove",
        "update",
      ],
    ],
  },
};
