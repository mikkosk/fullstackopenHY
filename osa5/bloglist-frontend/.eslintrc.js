module.exports = {
  'env': {
      'commonjs': true,
      'es6': true,
      'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly',
      'window': true
  },
  'parserOptions': {
      'ecmaVersion': 2018
  },
  'plugins': [
      "react-hooks"
  ],
  'rules': {
      'react-hooks/rules-of-hooks': 'error',
      'indent': [
          'error',
          2
      ],
      'linebreak-style': [
          'error',
          'unix'
      ],
      'quotes': [
          'error',
          'single'
      ],
      'semi': [
          'error',
          'never'
      ],
      "eqeqeq" : "error",
      "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "no-octal": 0,
        "linebreak-style": ["error", "windows"],
        "no-unused-vars": ["off"],
        "no-undef": ["off"]
      
  },
  "parserOptions": {
    "sourceType": "module",
    },
    "parser": "babel-eslint"
}
