import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import Exception from '@/components/Exception';

const ExceptionNotfind = ({ intl: { formatMessage } }) => (
  <Exception
    type="404"
    desc={formatMessage({ id: 'app.exception.description.404' })}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default injectIntl(ExceptionNotfind);
