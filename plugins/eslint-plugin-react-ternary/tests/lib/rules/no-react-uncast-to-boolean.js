/**
 * @fileoverview Prevent usage of uncast value in react JSX
 * @author pierrelouislp
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-react-uncast-to-boolean'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
};

require('babel-eslint');

var ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-react-uncast-to-boolean', rule, {
  valid: ['<View>{this.props.textMaybeEmpty ? <Text>{this.props.textMaybeEmpty}</Text> : null}</View> '],

  invalid: [
    {
      code: 'textMaybeEmpty && <Text>{this.props.textMaybeEmpty}</Text>',
      errors: [
        {
          message: 'Use ternary instead !',
          type: 'ExpressionStatement',
        },
      ],
    },
  ],
});
