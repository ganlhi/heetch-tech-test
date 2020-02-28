import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Actions } from '../lib/proptypes';
import { Alert, Button, Heading, Link } from '@heetch/flamingo-react';
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
  const [loadingError, setLoadingError] = useState(false);
  const [savingError, setSavingError] = useState(false);

  const loadItems = useCallback(() => {
    if (actions && actions.getItems) {
      setLoadingError(false);
      return fetchItems(actions.getItems.URL, actions.getItems.type)
        .then(setItems)
        .catch(err => {
          setLoadingError(true);
          console.error('Error while loading list of ' + itemName, err);
        });
    }
    return Promise.reject('Not permitted');
  }, [actions, fetchItems, itemName]);

  useEffect(() => {
    setItems(undefined);
    loadItems();
  }, [loadItems]);

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
    setSavingError(false);

    saveItem(action.URL, action.type, { ...editedItem, name, description })
      .then(() => loadItems())
      .then(() => {
        setEditedItem(undefined);
      })
      .catch(err => {
        setSavingError(true);
        console.error('Error while saving ' + itemName, err);
      })
      .finally(() => {
        setSaving(false);
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

      {loadingError && (
        <Alert type="error">
          Error while loading the list. Please{' '}
          <Link style={{ cursor: 'pointer' }} onClick={() => loadItems()}>
            retry
          </Link>
          ...
        </Alert>
      )}

      <EditPanel
        title={(editedItem?.id ? 'Update ' : 'Add new ') + itemName}
        values={editedItem}
        saving={saving}
        savingError={savingError}
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
