# Detect unused GraphQL operations (`graphql-unused-operations/unused-operations`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

This rule aims to detect unused GraphQL operations and report them. If you import a GraphQL operation but never utilize it in your code, this rule will inform you so you can clean up unused code and keep your application lean.

### Examples

#### Incorrect

```javascript
import myOperation from './somePath.graphql';
```

#### Correct

```javascript
import myOperation from './somePath.graphql';
function someFunction() {
    useMyOperationQuery();
}
```

## When Not To Use It

If you have a particular reason for keeping unused GraphQL operations in your codebase (perhaps for future implementation or for documentation purposes), you might want to disable this rule in those specific files or scenarios.

## Further Reading

- [GraphQL Operation Naming Conventions](https://spec.graphql.org/)
- [Best Practices for GraphQL](https://graphql.org/learn/best-practices/)
