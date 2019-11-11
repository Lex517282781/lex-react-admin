import React from 'react';
import PropTypes from 'prop-types';
import { UNITAUTHORITYOPEN } from '@/config/env';

const wrapAuth = authority => Component => {
  return class WrapComponent extends React.Component {
    static propTypes = {
      auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    };

    render() {
      const { auth, exception, ...rest } = this.props;
      if (
        (typeof auth === 'boolean' && auth) ||
        (typeof auth === 'string' && authority.includes(auth)) ||
        !UNITAUTHORITYOPEN
      ) {
        return <Component {...rest} />;
      } else {
        return exception || null;
      }
    }
  };
};

export default wrapAuth;
