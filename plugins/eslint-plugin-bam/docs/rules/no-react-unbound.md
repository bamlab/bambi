# Prevent using unbound class method as callback prop of a JSX (no-react-unbound)

This rule aims to prevent the bugs caused by the access to `this` in a class method that are not bound.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
import * as React from "react";

class MyComponent extends React.Component {

  handleClick() {
    this.callback();
  };

  render() {
    return <ChildComponent onClick={this.handleClick} />;
  }
}
```

Examples of **correct** code for this rule:

```js
import * as React from "react";

class MyComponent extends React.Component {

  handleClick = () => {
    this.callback();
  };

  render() {
    return <ChildComponent onClick={this.handleClick} />;
  }
}
```

```js
import * as React from "react";

class MyComponent extends React.Component {

  handleClick() {
    this.callback();
  };

  render() {
    return <ChildComponent onClick={() => this.handleClick()} />;
  }
}
```

## When Not To Use It

Function bindings using `function.bind(this)` will be ignored as our project do not use this technique. The rule cannot be used in this case.

```js
import * as React from "react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.callback();
  };

  render() {
    return <ChildComponent onClick={this.handleClick} />;
  }
}
```
