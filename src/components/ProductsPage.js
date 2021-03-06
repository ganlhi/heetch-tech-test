import { Actions } from '../lib/proptypes';
import React from 'react';
import { fetchProducts, saveProduct } from '../lib/api';
import ProductsList from './ProductsList';
import WithActions from './WithActions';

/**
 * Routed component allowing to display, create and update products
 * @param actions permitted actions for this page
 */
function ProductsPage({ actions }) {
  return (
    <WithActions
      actions={actions}
      title="Products"
      itemName="product"
      fetchItems={fetchProducts}
      saveItem={saveProduct}
      renderList={(items, startEdit) => {
        return <ProductsList products={items} onStartEdit={startEdit} />;
      }}
    />
  );
}

ProductsPage.propTypes = {
  actions: Actions,
};

export default ProductsPage;
