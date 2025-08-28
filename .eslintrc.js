module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true,
  },
  "settings": {
    "react": {
      "version": "18.2.0"
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true,
    "ecmaVersion": 2021,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  overrides: [
    {
      files: ["./js/**/*.tsx", "./test/**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: { 
        project: "./tsconfig.json" 
      },
      rules: {
      }
    },
    {
      files: ["**/*.js","**/*.jsx"],
      parser: "@babel/eslint-parser",
      rules: {
      }
    }
  ],
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "require-jsdoc": 0,
    "indent": "off", // disable native indent setting and use @typescript-eslint/indent instead
    "react/prop-types": "off",
    "@typescript-eslint/indent": [
      "warn", 4
    ],
    "max-len": [
        "error", {
            "code": 160,
            "ignoreStrings": true
        }
    ],
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
};
