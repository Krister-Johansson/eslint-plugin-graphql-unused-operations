const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/unused-operations");
const mockFs = require("mock-fs");

// Before running the tests, mock the filesystem
beforeEach(() => {
  mockFs({
    "somePath.graphql": `
        query MyOperation {
          someField
        }
    `,
  });
});

// After each test, restore the original filesystem
afterEach(() => {
  mockFs.restore();
});

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

ruleTester.run("detect-unused-graphql-operations", rule, {
  valid: [
    {
      // This example assumes a GraphQL operation is imported and used
      code: `
                import myOperation from './somePath.graphql';
                function someFunction() {
                    useMyOperationQuery();
                }
            `,
    },
  ],
  invalid: [
    {
      // This example assumes a GraphQL operation is imported but not used
      code: `
                import myOperation from './somePath.graphql';
            `,
      errors: [
        {
          messageId: "unusedOperation",
          data: { name: "MyOperation" },
        },
      ],
    },
  ],
});
