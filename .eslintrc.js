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
      files: ["./src/**/*.tsx", "./test/**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: { 
        project: "./tsconfig.json" 
      },
      rules: {
      }
    },
    {
      files: ["./src/**/*.js", "./test/**/*.js"],
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
    "import",
    "chai-friendly"
  ],
  "rules": {
    "require-jsdoc": 0,
    "indent": "off", // disable native indent setting and use @typescript-eslint/indent instead
    "@typescript-eslint/indent": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "chai-friendly/no-unused-expressions": "error",
    "react/react-in-jsx-scope": "off"
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
};
