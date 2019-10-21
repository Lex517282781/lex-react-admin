import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import Exception from '@/components/Exception';

const ExceptionUnauthorized = ({ intl: { formatMessage } }) => (
  <Exception
    type="401"
    desc={formatMessage({ id: 'app.exception.description.401' })}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back.login' })}
    redirect="/user"
  />
);

export default injectIntl(ExceptionUnauthorized);
