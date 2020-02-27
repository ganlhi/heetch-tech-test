import { ActionsMap } from '../lib/proptypes';
import { Alert, Heading, Spinner, Table, Text } from '@heetch/flamingo-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCities } from '../lib/api';

function CitiesPage({ actionsMap }) {
  const { pathname } = useLocation();
  const [countryCities, setCountryCities] = useState();

  const actions = actionsMap[pathname];

  useEffect(() => {
    if (actions && actions.getItems) {
      fetchCities(actions.getItems.URL, actions.getItems.type).then(setCountryCities);
    }
  }, [actions, pathname]);

  useEffect(() => {
    setCountryCities(undefined);
  }, [pathname]);

  if (!actions || actions.show !== true) {
    return <Alert type="error">You are not allowed to display this page</Alert>;
  }

  if (!countryCities) {
    return (
      <Text style={{ textAlign: 'center' }}>
        <Spinner /> Loading cities...
      </Text>
    );
  }

  return (
    <>
      <Heading level={2}>Cities of {countryCities.country}</Heading>

      <Table
        columns={[
          { Header: 'Name', accessor: 'name' },
          { Header: 'Description', accessor: 'description' },
        ]}
        data={countryCities.cities}
        isSortable={true}
      />
    </>
  );
}

CitiesPage.propTypes = {
  actionsMap: ActionsMap,
};

export default CitiesPage;
