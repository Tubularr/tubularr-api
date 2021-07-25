'use strict';

module.exports = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'project': './tsconfig.json'
  },
  'env': {
    'node': true,
    'es6': true
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'reportUnusedDisableDirectives': true,
  'rules': {
    'semi': 'off',
    '@typescript-eslint/semi': [
      'error'
    ],
    'quotes': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single'
    ],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': [
      'error',
      'never'
    ],
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': [
      'error',
      'never'
    ],
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': [
      'error',
      {
        'before': true,
        'after': true
      }
    ],
    'require-await': 'error',
    'key-spacing': [
      'error',
      {
        'beforeColon': false,
        'afterColon': true,
        'mode': 'strict'
      }
    ],
    'space-unary-ops': [
      'error',
      {
        'words': true,
        'nonwords': false
      }
    ],
    'space-infix-ops': 'error',
    'prefer-template': 'error',
    'no-unneeded-ternary': 'error',
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always'
    ],
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': [
      'error'
    ],
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': [
      'error'
    ],
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': [
      'error'
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1,
        'maxEOF': 1,
        'maxBOF': 1
      }
    ],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'return'
      },
      {
        'blankLine': 'always',
        'prev': [
          'const',
          'let',
          'var'
        ],
        'next': '*'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': [
          'const',
          'let',
          'var',
          'expression'
        ]
      },
      {
        'blankLine': 'any',
        'prev': [
          'expression'
        ],
        'next': [
          'expression'
        ]
      },
      {
        'blankLine': 'any',
        'prev': [
          'const',
          'let',
          'var'
        ],
        'next': [
          'const',
          'let',
          'var'
        ]
      },
      {
        'blankLine': 'always',
        'prev': 'directive',
        'next': '*'
      },
      {
        'blankLine': 'any',
        'prev': 'directive',
        'next': 'directive'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': [
          'break',
          'class',
          'continue',
          'do',
          'export',
          'for',
          'function',
          'if',
          'switch',
          'throw',
          'try',
          'while'
        ]
      },
      {
        'blankLine': 'always',
        'prev': [
          'break',
          'class',
          'continue',
          'do',
          'export',
          'for',
          'function',
          'if',
          'switch',
          'throw',
          'try',
          'while'
        ],
        'next': '*'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'block-like'
      }
    ],
    'camelcase': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variable',
        'format': [
          'camelCase',
          'UPPER_CASE'
        ]
      },
      {
        'selector': 'parameter',
        'format': [
          'camelCase'
        ],
        'leadingUnderscore': 'allow'
      },
      {
        'selector': [
          'property',
          'parameterProperty',
          'accessor',
          'enumMember'
        ],
        'modifiers': [
          'private'
        ],
        'format': [
          'camelCase'
        ],
        'leadingUnderscore': 'require'
      },
      {
        'selector': 'typeLike',
        'format': [
          'PascalCase'
        ]
      },
      {
        'selector': 'interface',
        'format': [
          'PascalCase'
        ],
        'prefix': [
          'I'
        ]
      },
      {
        'selector': [
          'classProperty',
          'objectLiteralProperty',
          'typeProperty',
          'classMethod',
          'objectLiteralMethod',
          'typeMethod',
          'accessor',
          'enumMember'
        ],
        'format': null,
        'modifiers': [
          'requiresQuotes'
        ]
      }
    ]
  }
}
