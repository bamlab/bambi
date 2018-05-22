/**
 * @fileoverview Prevent usage of uncast value in react JSX
 * @author pierrelouislp
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of uncast value in react JSX',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create(context) {
    return {
      ExpressionStatement(node) {
        const expression = node.expression;

        if (
          expression.type === 'LogicalExpression' &&
          expression.left.type === 'Identifier' &&
          expression.right.type === 'JSXElement'
        ) {
          context.report(node, 'Use ternary instead !');
        }
      },
    };
  },
};
