import React from 'react';
import { render } from '@testing-library/react';
import EditPanel from './EditPanel';

describe('EditPanel', () => {
  test('Shows creation form', () => {
    const { getByLabelText, getByText } = render(
      <EditPanel
        title="Edit foo"
        values={{ name: '', description: '' }}
        saving={false}
        savingError={false}
        onCancel={global.emptyFn}
        onSave={global.emptyFn}
      />
    );
    expect(getByLabelText(/Name/)).toHaveAttribute('value', '');
    expect(getByLabelText(/Description/)).toHaveTextContent('');
    expect(getByText(/Save/)).toBeDisabled();
  });

  test('Shows edition form', () => {
    const { getByLabelText, getByText } = render(
      <EditPanel
        title="Edit foo"
        values={{ name: 'foo', description: 'bar' }}
        saving={false}
        savingError={false}
        onCancel={global.emptyFn}
        onSave={global.emptyFn}
      />
    );
    expect(getByLabelText(/Name/)).toHaveAttribute('value', 'foo');
    expect(getByLabelText(/Description/)).toHaveTextContent('bar');
    expect(getByText(/Save/)).not.toBeDisabled();
  });

  test('Shows saving spinner', () => {
    const { getByText } = render(
      <EditPanel
        title="Edit foo"
        values={{ name: 'foo', description: 'bar' }}
        saving={true}
        savingError={false}
        onCancel={global.emptyFn}
        onSave={global.emptyFn}
      />
    );
    expect(getByText(/Saving.../)).toBeInTheDocument();
  });

  test('Shows error', () => {
    const { getByText } = render(
      <EditPanel
        title="Edit foo"
        values={{ name: 'foo', description: 'bar' }}
        saving={false}
        savingError={true}
        onCancel={global.emptyFn}
        onSave={global.emptyFn}
      />
    );
    expect(getByText(/Error while saving/)).toBeInTheDocument();
  });
});
