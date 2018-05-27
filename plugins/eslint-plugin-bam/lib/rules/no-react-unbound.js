/**
 * @fileoverview Prevent using unbound class method as callback of a JSX
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
      description: 'Prevent using unbound class method as callback of a JSX function',
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
          let nodeWithParent = { ...node, parent };
          if (condition(nodeWithParent)) {
            results.push(nodeWithParent);
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
          // the node is `this.[method name]`:
          if (n.type !== 'MemberExpression') return false;
          if (n.object.type !== 'ThisExpression') return false;
          if (n.property.name !== node.key.name) return false;

          // the method of the node is not called:
          if (n.parent.type === 'CallExpression') return false;

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
