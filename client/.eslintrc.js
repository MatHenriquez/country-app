module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "tailwindcss"],
  rules: {
    "tailwindcss/classnames-order": "off",
  },
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      rules: {
        "tailwindcss/classnames-order": "off",
        "tailwindcss/no-custom-classname": "off",
      },
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier",
      ],
    },
  ],
};
