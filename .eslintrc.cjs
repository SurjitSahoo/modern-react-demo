module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 13,
    "sourceType": "module",
    "project": "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  "plugins": ["react", "@typescript-eslint", "filename-rules", "spellcheck", "prettier"],
  "rules": {
    "camelcase": "warn",
    "no-console": "off",
    "no-restricted-syntax": [
      "warn",
      {
        "selector": "CallExpression[callee.object.name='console'][callee.property.name=/^(log|warn|info|trace)$/]",
        "message": "Unexpected console statement"
      }
    ],
    "max-len": [
      "warn",
      {
        "code": 120,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "jsx-quotes": ["error", "prefer-single"],
    "react/react-in-jsx-scope": "off",
    "linebreak-style": "off",
    "react/prop-types": "off",
    "arrow-parens": ["error", "as-needed"],
    "@typescript-eslint/no-explicit-any": "off",
    "react/require-default-props": "off",
    "object-curly-newline": "off",
    "import/prefer-default-export": "off",
    "filename-rules/match": ["warn", "camelcase"],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "no-param-reassign": "off",
    "react/function-component-definition": [
      "warn",
      {
        "namedComponents": "function-declaration"
      }
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": ["**/*.stories.*", "**/.storybook/**/*.*", "**/*.test.*", "src/setupTest.ts"],
        "peerDependencies": true
      }
    ]
  },
  "overrides": [
    {
      "files": ["**/*.stories.*", "**/.storybook/**/*.*"],
      "rules": {
        "react/function-component-definition": "off"
      }
    }
  ]
}
