/**
 * @fileoverview Prevent using unbound class method as callback of a JSX
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
const options = {
  parser: 'babel-eslint',
};

require('babel-eslint');

var ruleTester = new RuleTester(options);
ruleTester.run('no-react-unbound', rule, {
  valid: [
    `
import * as React from "react";

class MyComponent extends React.Component {

  handleClick() {
    console.log(Date.now())
  }

  render(){ return <div onClick={this.handleClick} /> }
}`,
    `
import * as React from "react";

class MyComponent extends React.Component {

  handleClick() {
    this.callback();
  }

  render(){ return <div onClick={() => this.handleClick()} /> }
}`,
    `
import * as React from "react";

class MyComponent extends React.Component {

  handleClick = () => {
    this.callback();
  }

  render(){ return <div onClick={this.handleClick} /> }
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
