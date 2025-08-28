module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
  },
  "settings": {
    "react": {
      "version": "18.2.0"
    }
  },
  "extends": [
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "google",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true,
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020,
  },
  "plugins": [
    "@typescript-eslint",
    "react",
  ],
  "rules": {
    "require-jsdoc" : 0,
    "indent": ["warn", 4],
    "max-len": [
      "error", {
        "code": 160,
        "ignoreStrings": true
      }
    ]
  },
};
