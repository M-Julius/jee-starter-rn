module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "unused-imports"
    ],
    "rules": {
        "no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
        ],
        "object-curly-spacing": "off",
        "@typescript-eslint/object-curly-spacing": ["error", "never"],
        "react/style-prop-object": 0,
        "no-param-reassign": ["error", { "props": false }],
        "react/jsx-props-no-spreading": "off",
        "import/extensions": [
          "off",
          "ignorePackages",
          {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never"
          }
       ],
       "react/static-property-placement": "off"
    }
}
