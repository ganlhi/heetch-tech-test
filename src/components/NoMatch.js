import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Alert } from '@heetch/flamingo-react';

/**
 * Component to display on unmatched routes
 */
function NoMatch() {
  const { pathname } = useLocation();

  return (
    <Alert type="error">
      No match for <code>{pathname}</code>
      <br />
      <Link className="f-Link" to="/">
        Go back to home page
      </Link>
    </Alert>
  );
}

export default NoMatch;
