import { Actions } from '../lib/proptypes';
import { Alert, Heading, Spinner, Table, Text } from '@heetch/flamingo-react';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../lib/api';

function ProductsPage({ actions }) {
  const [products, setProducts] = useState();

  useEffect(() => {
    if (actions && actions.getItems) {
      fetchProducts(actions.getItems.URL, actions.getItems.type).then(setProducts);
    }
  }, [actions]);

  if (!actions || actions.show !== true) {
    return <Alert type="error">You are not allowed to display this page</Alert>;
  }

  if (!products) {
    return (
      <Text style={{ textAlign: 'center' }}>
        <Spinner /> Loading products...
      </Text>
    );
  }

  return (
    <>
      <Heading level={2}>Products</Heading>
      <Table
        columns={[
          { Header: 'Name', accessor: 'name' },
          { Header: 'Description', accessor: 'description' },
          { Header: 'Status', accessor: 'status' },
        ]}
        data={products}
        isSortable={true}
      />
    </>
  );
}

ProductsPage.propTypes = {
  actions: Actions,
};

export default ProductsPage;
