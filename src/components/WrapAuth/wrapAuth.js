import React from 'react';
import PropTypes from 'prop-types';

const wrapAuth = authority => Component => {
  return class WrapComponent extends React.Component {
    static propTypes = {
      auth: PropTypes.string.isRequired
    };

    render() {
      const { auth, exception, ...rest } = this.props;
      if (authority.includes(auth)) {
        return <Component {...rest} />;
      } else {
        return exception || null;
      }
    }
  };
};

export default wrapAuth;
