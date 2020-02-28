import { Actions } from '../lib/proptypes';
import { Alert, Button, Heading } from '@heetch/flamingo-react';
import React, { useEffect, useState } from 'react';
import { fetchProducts, saveProduct } from '../lib/api';
import ProductsList from './ProductsList';
import EditPanel from './EditPanel';

function ProductsPage({ actions }) {
  const [products, setProducts] = useState(undefined);
  const [editedProduct, setEditedProduct] = useState(undefined);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProductsList().then(setProducts);
  }, [actions]);

  function loadProductsList() {
    if (actions && actions.getItems) {
      return fetchProducts(actions.getItems.URL, actions.getItems.type);
    }
    return Promise.reject('Not permitted');
  }

  function startCreate() {
    if (!actions.addItem) return;
    setEditedProduct({ name: '', description: '' });
  }

  function startEdit(product) {
    if (!actions.updateItem) return;
    setEditedProduct({ ...product });
  }

  function cancelEdit() {
    setEditedProduct(undefined);
  }

  function completeEdit({ name, description }) {
    if (!editedProduct) return;
    const action = !editedProduct.id ? actions.addItem : actions.updateItem;
    setSaving(true);
    saveProduct(action.URL, action.type, { ...editedProduct, name, description })
      .then(() => loadProductsList())
      .then(products => {
        setSaving(false);
        setEditedProduct(undefined);
        setProducts(products);
      });
  }

  if (!actions || actions.show !== true) {
    return <Alert type="error">You are not allowed to display this page</Alert>;
  }

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Heading level={2}>Products</Heading>
        <Button onClick={() => startCreate()}>Add</Button>
      </header>

      <ProductsList products={products} onStartEdit={startEdit} />

      <EditPanel
        title={editedProduct?.id ? 'Update product' : 'Add new product'}
        values={editedProduct}
        saving={saving}
        onSave={completeEdit}
        onCancel={cancelEdit}
      />
    </>
  );
}

ProductsPage.propTypes = {
  actions: Actions,
};

export default ProductsPage;
