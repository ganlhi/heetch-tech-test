import React from 'react';
import PropTypes from 'prop-types';
import { Product } from '../lib/proptypes';
import { IconButton, Popover, Spinner, Table, Text } from '@heetch/flamingo-react';

function ProductsList({ products, onStartEdit }) {
  return (
    <>
      <Table
        columns={[
          { Header: 'Name', accessor: 'name' },
          { Header: 'Description', accessor: 'description' },
          { Header: 'Status', accessor: 'status' },
          {
            Header: '',
            accessor: '',
            id: 'actions',
            Cell: ({ row }) => (
              <Popover content="Edit product">
                <IconButton icon="IconPen" size="s" onClick={() => onStartEdit(row.original)} />
              </Popover>
            ),
          },
        ]}
        data={products || []}
      />
      {!products && (
        <Text style={{ textAlign: 'center' }}>
          <Spinner /> Loading products...
        </Text>
      )}
    </>
  );
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(Product),
  onStartEdit: PropTypes.func.isRequired,
};

export default ProductsList;
