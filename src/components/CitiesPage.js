import { ActionsMap } from '../lib/proptypes';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCities, getCountryCode, saveCity } from '../lib/api';
import NoMatch from './NoMatch';
import WithActions from './WithActions';
import CitiesList from './CitiesList';

function CitiesPage({ actionsMap }) {
  const { pathname } = useLocation();

  let actions;
  if (actionsMap.hasOwnProperty(pathname)) {
    actions = actionsMap[pathname] || { show: false };
  }

  if (!actions) {
    return <NoMatch />;
  }

  const saveCityItem = (url, method, city) => {
    const countryCode = getCountryCode(actions);
    return countryCode ? saveCity(url, method, countryCode, city) : Promise.reject('Unable to determine country code');
  };

  return (
    <WithActions
      actions={actions}
      title="Cities"
      itemName="city"
      fetchItems={fetchCities}
      saveItem={saveCityItem}
      renderList={(items, startEdit) => {
        return <CitiesList countryCities={items} onStartEdit={startEdit} />;
      }}
    />
  );
}

CitiesPage.propTypes = {
  actionsMap: ActionsMap,
};

export default CitiesPage;
