import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Input, Label, SidePanel, Spinner, Text, Textarea } from '@heetch/flamingo-react';

/**
 * Generic component displaying a form in a sliding side panel, allowing to edit name and description of a given item
 * @param title Title of the panel
 * @param values Initial name and description
 * @param onCancel Callback to cancel the edition
 * @param onSave Callback to submit the values of the form
 * @param saving Is the form data being saved?
 */
function EditPanel({ title, values, onCancel, onSave, saving, savingError }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (values) {
      setName(values.name);
      setDescription(values.description);
    }
  }, [values]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function hansetDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <SidePanel
      title={title}
      isOpen={values !== undefined}
      closesOnOverlayClick
      onClose={() => onCancel()}
      footer={
        <>
          <Button intent="secondary" variant="minimal" onClick={() => onCancel()} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={() => onSave({ name, description })} disabled={!name || saving}>
            Save
          </Button>
        </>
      }
    >
      {values && (
        <>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input onChange={handleNameChange} id="name" value={name} invalid={!name} disabled={saving} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea onChange={hansetDescriptionChange} id="description" value={description} disabled={saving} />
          </div>
          {saving && (
            <Text>
              <Spinner /> Saving...
            </Text>
          )}
        </>
      )}

      {savingError && <Alert type="error">Error while saving. Please retry...</Alert>}
    </SidePanel>
  );
}

EditPanel.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  savingError: PropTypes.bool,
};

export default EditPanel;
