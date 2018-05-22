/**
 * @fileoverview Prevent using unbinded class method as callback of a JSX
 * @author AmauryLiet
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-react-unbound'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const parserOptions = {
  //ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
  env: { es6: true, jest: true },
};

require('babel-eslint');

var ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-react-unbind', rule, {
  valid: [
    `
import * as React from "react";

class MyComponent extends React.Component {

  setSelectedFilter() {
    console.log(Date.now())
  }

  render(){ return <div onClick={this.setSelectedFilter} /> }
}`,
  ],

  invalid: [
    {
      code: `
import * as React from "react";

class MyComponent extends React.Component {

  handleClick() {
    this.callback();
  }

  render(){ return <div onClick={this.handleClick} /> }
}`,
      errors: [
        {
          message: 'Please bind your function',
          type: 'MethodDefinition',
        },
      ],
    },
  ],
});
