// @flow
import React from 'react';
import { connect } from 'react-redux';

@connect()
export default class Example extends React.Component {
  state = {
    x: 'x',
    ...{
      y: 'y',
    },
  };

  props: { x: string };

  static getInitialProps() {}

  constructor(props, context) {
    super(props, context);
    this.state = {
      ...this.state,
      x: props.x,
    };
  }

  componentDidMount() {
    fetch('http://example.com');
    this.loadData().then(console.log);
    new XMLHttpRequest().send();
    Uint16Array.from([1, 2, 3, 4, 5]);
    new SharedArrayBuffer(16).slice();
  }

  loadData = async () => {
    await fetch('http://example.com');
  };

  shouldComponentUpdate() {}

  render() {
    return <div>{this.state.x}</div>;
  }

  _handleWhatever() {}
}
