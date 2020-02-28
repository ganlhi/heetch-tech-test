import React from 'react';
import PropTypes from 'prop-types';
import { Product } from '../lib/proptypes';
import { Heading, IconButton, Popover, Spinner, Table, Text } from '@heetch/flamingo-react';

/**
 * Presentational component displaying a list of the cities of a country
 * @param countryCities contains the country, the capital name and the list of cities
 * @param onStartEdit callback to trigger edit mode for a given city
 */
function CitiesList({ countryCities, onStartEdit }) {
  return (
    <>
      <Heading level={5}>Country: {countryCities ? countryCities.country : <Spinner />}</Heading>
      <Table
        columns={[
          { Header: 'Name', accessor: 'name' },
          { Header: 'Description', accessor: 'description' },
          {
            Header: '',
            accessor: '',
            id: 'actions',
            Cell: ({ row }) => (
              <Popover content="Edit city">
                <IconButton icon="IconPen" size="s" onClick={() => onStartEdit(row.original)} />
              </Popover>
            ),
          },
        ]}
        data={countryCities?.cities || []}
      />
      {!countryCities && (
        <Text style={{ textAlign: 'center' }}>
          <Spinner /> Loading cities...
        </Text>
      )}
    </>
  );
}

CitiesList.propTypes = {
  products: PropTypes.arrayOf(Product),
  onStartEdit: PropTypes.func.isRequired,
};

export default CitiesList;
