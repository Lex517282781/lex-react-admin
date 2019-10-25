import React from 'react';
import PropTypes from 'prop-types';

const wrapAuth = authority => Component => {
  return class WrapComponent extends React.Component {
    static propTypes = {
      auth: PropTypes.string.isRequired
    };

    render() {
      if (authority.includes(this.props.auth)) {
        return <Component key="account" {...this.props} />;
      } else {
        return null;
      }
    }
  };
};

export default wrapAuth;
