import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import Exception from '@/components/Exception';

const ExceptionNotpermission = ({ intl: { formatMessage } }) => (
  <Exception
    type="403"
    desc={formatMessage({ id: 'app.exception.description.403' })}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default injectIntl(ExceptionNotpermission);
