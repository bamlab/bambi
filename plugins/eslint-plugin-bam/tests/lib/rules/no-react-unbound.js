/**
 * @fileoverview Prevent using unbound class method as callback of a JSX
 * @author AmauryLiet
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester,
  rule = require('../../../lib/rules/no-react-unbound');

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
    `
import * as React from "react";

class MyComponent extends React.Component {
  handleClick() {
    this.callback();
  }

  render(){
    const boundMethod = () => this.handleClick();
    return <div
      onClick={boundMethod}
    /> }
}`,
    `
import * as React from "react";

class MyComponent extends React.Component {
  handleClick() {
    this.callback();
  }

  render(){
    return <div
      value={this.getValue()}
    /> }
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
    {
      code: `
import * as React from "react";

class MyComponent extends React.Component {
  handleClick() {
    this.callback();
  }

  render(){
    const renamedMethod = this.handleClick;
    return <div
      onClick={renamedMethod}
    /> }
}`,
      errors: [
        {
          message: 'Please bind your function',
        },
      ],
    },
    {
      code: `
import * as React from "react";

class MyComponent extends React.Component {
  handleClick() {
    this.callback();
  }

  render(){
    const unboundMethod = this.props.clickable ? this.handleClick : () => {};
    return <div
      onClick={unboundMethod}
    /> }
}`,
      errors: [
        {
          message: 'Please bind your function',
        },
      ],
    },
  ],
});
