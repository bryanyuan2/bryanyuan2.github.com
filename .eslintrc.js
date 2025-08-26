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
    "plugin:react/recommended",
    "google",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 2020,
  },
  "plugins": [
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
