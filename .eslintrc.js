module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
  },
  "settings": {
    "react": {
      "version": "16.13.1"
    }
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
  },
  'plugins': [
    'react',
  ],
  'rules': {
    "indent": ["warn", 4],
    "max-len": [
      "error", {
        "code": 160,
        "ignoreStrings": true
      }
    ]
  },
};
