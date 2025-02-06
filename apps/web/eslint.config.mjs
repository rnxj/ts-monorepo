import nextPlugin from "@next/eslint-plugin-next";
import createConfig from "@repo/eslint-config/create-config";
import tailwind from "eslint-plugin-tailwindcss";

export default createConfig(
  {
    react: true,
    lessOpinionated: true,
    isInEditor: false,
    ignores: ["migrations/**/*", "next-env.d.ts"],
  },
  ...tailwind.configs["flat/recommended"],
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "style/brace-style": ["error", "1tbs"],
      "react/prefer-destructuring-assignment": "off",
    },
  },
);
