import React from 'react';
import PropTypes from 'prop-types';
import { Product } from '../lib/proptypes';
import { IconButton, Popover, Spinner, Table, Text } from '@heetch/flamingo-react';

/**
 * Presentational component displaying a list of products
 * @param products List of products
 * @param onStartEdit Callback to trigger edit mode for a given product
 */
function ProductsList({ products, onStartEdit }) {
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Status', accessor: 'status' },
  ];

  if (typeof onStartEdit === 'function') {
    columns.push({
      Header: '',
      accessor: '',
      id: 'actions',
      Cell: ({ row }) => (
        <Popover content="Edit product">
          <IconButton icon="IconPen" size="s" onClick={() => onStartEdit(row.original)} />
        </Popover>
      ),
    });
  }

  return (
    <>
      <Table columns={columns} data={products || []} />
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
  onStartEdit: PropTypes.func,
};

export default ProductsList;
