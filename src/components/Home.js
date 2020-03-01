import { Heading } from '@heetch/flamingo-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Heading level={1}>Home</Heading>
      <p>Welcome to Products and Cities Catalog! </p>
      <p>
        Please use the left menu to browse{' '}
        <Link to="/products" className="f-Link">
          products
        </Link>{' '}
        or cities of a country.
      </p>
    </div>
  );
}

export default Home;
