import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Actions } from '../lib/proptypes';
import { Alert, Button, Heading } from '@heetch/flamingo-react';
import EditPanel from './EditPanel';

/**
 * Container component handling generic logic to load list data, edit and create items.
 * @param actions Permitted actions for the current scope
 * @param title Title of the page
 * @param itemName Name of an individual item
 * @param fetchItems Function to request items list
 * @param saveItem Function to request item update or creation
 * @param renderList Function to render a specific list component
 */
function WithActions({ actions, title, itemName, fetchItems, saveItem, renderList }) {
  const [items, setItems] = useState(undefined);
  const [editedItem, setEditedItem] = useState(undefined);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(undefined);
    loadItems().then(setItems);
  }, [actions]);

  function loadItems() {
    if (actions && actions.getItems) {
      return fetchItems(actions.getItems.URL, actions.getItems.type);
    }
    return Promise.reject('Not permitted');
  }

  function startCreate() {
    if (!actions.addItem) return;
    setEditedItem({ name: '', description: '' });
  }

  function startEdit(product) {
    if (!actions.updateItem) return;
    setEditedItem({ ...product });
  }

  function cancelEdit() {
    setEditedItem(undefined);
  }

  function completeEdit({ name, description }) {
    if (!editedItem) return;

    const action = !editedItem.id ? actions.addItem : actions.updateItem;

    setSaving(true);

    saveItem(action.URL, action.type, { ...editedItem, name, description })
      .then(() => loadItems())
      .then(items => {
        setSaving(false);
        setEditedItem(undefined);
        setItems(items);
      });
  }

  if (!actions || actions.show !== true) {
    return <Alert type="error">You are not allowed to display this page</Alert>;
  }

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Heading level={2}>{title}</Heading>
        <Button onClick={() => startCreate()}>Add</Button>
      </header>

      {renderList(items, startEdit)}

      <EditPanel
        title={(editedItem?.id ? 'Update ' : 'Add new ') + itemName}
        values={editedItem}
        saving={saving}
        onSave={completeEdit}
        onCancel={cancelEdit}
      />
    </>
  );
}

WithActions.propTypes = {
  actions: Actions,
  title: PropTypes.string.isRequired,
  itemName: PropTypes.string,
  fetchItems: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
  renderList: PropTypes.func.isRequired,
};

WithActions.defaultProps = {
  itemName: 'item',
};

export default WithActions;
