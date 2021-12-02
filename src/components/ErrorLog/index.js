import React from 'react';
import PropTypes from 'prop-types';

import { Gnb } from '../gnb';

const ErrorLog = ({ error }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <pre style={{ color: 'black' }}>{error.message}</pre>
      <Gnb />
    </div>
  );
};

ErrorLog.propTypes = {
  error: PropTypes.any,
};

export default ErrorLog;
