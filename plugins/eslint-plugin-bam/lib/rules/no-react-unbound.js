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
      MethodDefinition(classMethodNode) {
        const thisUsagesInMethod = match(
          classMethodNode,
          descendantNode => descendantNode.type === 'ThisExpression'
        );
        if (!thisUsagesInMethod.length) return;

        const unboundCallsOfTheMethod = match(classMethodNode.parent, descendantNode => {
          // the node is `this.[class method name]`:
          if (descendantNode.type !== 'MemberExpression') return false;
          if (descendantNode.object.type !== 'ThisExpression') return false;
          if (descendantNode.property.name !== classMethodNode.key.name) return false;

          // the method of the node is not called:
          if (descendantNode.parent.type === 'CallExpression') return false;

          return true;
        });

        if (unboundCallsOfTheMethod.length) {
          context.report(classMethodNode, 'Please bind your function');
        }
      },
    };
  },
};
