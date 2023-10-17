# eslint-plugin-graphql-unused-operations

ESLint plugin to detect and report unused GraphQL operations in .gql and .graphql files.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-graphql-unused-operations`:

```sh
npm install eslint-plugin-graphql-unused-operations --save-dev
```

## Usage

Add `graphql-unused-operations` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "graphql-unused-operations"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "graphql-unused-operations/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                 | Description                      | 🔧 |
| :--------------------------------------------------- | :------------------------------- | :- |
| [unused-operations](docs/rules/unused-operations.md) | Detect unused GraphQL operations | 🔧 |

<!-- end auto-generated rules list -->


