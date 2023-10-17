const { parse } = require('graphql');
const fs = require('fs');
const path = require('path');

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Detect unused GraphQL operations',
            category: 'Possible Errors',
            recommended: true
        },
        fixable: 'code',
        messages: {
            unusedOperation: "GraphQL operation '{{name}}' is unused."
        },
        schema: []
    },
    create: function(context) {
        let graphqlOperations = [];

        // Helper function to extract operation names from a parsed GraphQL AST
        function extractOperationNames(document) {
            const operations = [];
            document.definitions.forEach(definition => {
                if (definition.kind === 'OperationDefinition' && definition.name) {
                    const operationTypeSuffix = definition.operation.charAt(0).toUpperCase() + definition.operation.slice(1);
                    const hookName = `use${definition.name.value}${operationTypeSuffix}`;
                    operations.push(hookName);
                }
            });
            return operations;
        }

        return {
            // Collect all GraphQL operations from .gql or .graphql imports
            ImportDeclaration(node) {
                if (/\.(graphql|gql)$/.test(node.source.value)) {
                    const filepath = path.join(path.dirname(context.getFilename()), node.source.value);
                    try {
                        const content = fs.readFileSync(filepath, 'utf-8');
                        const parsed = parse(content);
                        const operations = extractOperationNames(parsed);
                        operations.forEach(operation => {
                            graphqlOperations.push({
                                name: operation,
                                node: node,
                                used: false
                            });
                        });
                    } catch (err) {
                        // Handle errors: might be due to file not found, or parsing issues
                        console.error(`Error parsing GraphQL file ${filepath}:`, err);
                    }
                }
            },
            // Check for the usage of the GraphQL operations
            Identifier(node) {
                const operationObj = graphqlOperations.find(op => op.name === node.name);
                if (operationObj) {
                    operationObj.used = true;
                }
            },
            'Program:exit': function() {
                for (const operationObj of graphqlOperations) {
                    if (!operationObj.used) {
                        context.report({
                            node: operationObj.node,
                            messageId: 'unusedOperation',
                            data: {
                                name: operationObj.name.replace(/^use/, '').replace(/(Query|Mutation|Subscription)$/, '')
                            }
                        });
                    }
                }
            }
        };
    }
};
