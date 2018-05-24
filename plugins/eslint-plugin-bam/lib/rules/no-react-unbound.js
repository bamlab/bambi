/**
 * @fileoverview Prevent using unbinded class method as callback of a JSX
 * @author AmauryLiet
 */
'use strict';

var Traverser = require('eslint/lib/util/traverser');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent using unbinded class method as callback of a JSX function',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------
    function match(ast, condition) {
      var results = [];
      Traverser.traverse(ast, {
        enter(node, parent) {
          if (condition(node)) {
            results.push(node);
          }
        },
      });
      return results;
    }
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      MethodDefinition(node) {
        const thisUsages = match(node, n => n.type === 'ThisExpression');
        if (!thisUsages.length) return;

        const results = match(node.parent, n => {
          if (n.type !== 'JSXExpressionContainer') return false;
          if (!n.expression.object || n.expression.object.type !== 'ThisExpression') return false;
          if (!n.expression.property || n.expression.property.name !== node.key.name) return false;
          return true;
        });

        if (results.length) {
          context.report(node, 'Please bind your function');
        }
      },
      // give me methods
    };
  },
};
