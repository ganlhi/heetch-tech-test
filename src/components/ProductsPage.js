import { Actions } from '../lib/proptypes';
import {
  Alert,
  Button,
  Heading,
  IconButton,
  Input,
  Label,
  Popover,
  SidePanel,
  Spinner,
  Table,
  Text,
  Textarea,
} from '@heetch/flamingo-react';
import React, { useEffect, useState } from 'react';
import { fetchProducts, saveProduct } from '../lib/api';

function ProductsPage({ actions }) {
  const [products, setProducts] = useState(undefined);
  const [editedProduct, setEditedProduct] = useState(undefined);

  useEffect(() => {
    if (actions && actions.getItems) {
      fetchProducts(actions.getItems.URL, actions.getItems.type).then(setProducts);
    }
  }, [actions]);

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

  function completeEdit() {
    if (!editedProduct) return;
    console.log('EDIT', editedProduct);
    const action = !editedProduct.id ? actions.addItem : actions.updateItem;
    saveProduct(action.URL, action.type, editedProduct);
    setEditedProduct(undefined);
  }

  function handleChangeName(event) {
    if (!editedProduct) return;
    setEditedProduct({ ...editedProduct, name: event.target.value });
  }

  function handleChangeDescription(event) {
    if (!editedProduct) return;
    setEditedProduct({ ...editedProduct, description: event.target.value });
  }

  function isFormValid() {
    return editedProduct && editedProduct.name.length > 0;
  }

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
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Heading level={2}>Products</Heading>
        <Button onClick={() => startCreate()}>Add</Button>
      </header>

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
                <IconButton icon="IconPen" size="s" onClick={() => startEdit(row.original)}>
                  Test
                </IconButton>
              </Popover>
            ),
          },
        ]}
        data={products}
      />
      <SidePanel
        isOpen={editedProduct !== undefined}
        closesOnOverlayClick
        onClose={() => cancelEdit()}
        footer={
          <>
            <Button intent="secondary" variant="minimal" onClick={() => cancelEdit()}>
              Cancel
            </Button>
            <Button onClick={() => completeEdit()} disabled={!isFormValid()}>
              Save
            </Button>
          </>
        }
      >
        {editedProduct && (
          <>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input onChange={handleChangeName} id="name" value={editedProduct.name} invalid={!isFormValid()} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea onChange={handleChangeDescription} id="description" value={editedProduct.description} />
            </div>
          </>
        )}
      </SidePanel>
    </>
  );
}

ProductsPage.propTypes = {
  actions: Actions,
};

export default ProductsPage;
