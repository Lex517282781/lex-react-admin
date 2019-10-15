import React, { Component } from 'react';
import PageLoading from '../PageLoading';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      this._isMounted = true;
      const { default: component } = await importComponent();
      if (!this._isMounted) return;
      this.setState({
        component: component
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const Component = this.state.component;

      return Component ? <Component {...this.props} /> : <PageLoading />;
    }
  }

  return AsyncComponent;
}
