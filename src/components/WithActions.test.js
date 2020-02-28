import React from 'react';
import { render } from '@testing-library/react';
import WithActions from './WithActions';

const fetchItems = () => Promise.resolve([]);
const renderList = items => <p>Fake list content ({items?.length} items)</p>;

describe('WithActions', () => {
  test('Shows permission error because of no actions', () => {
    const { getByText } = render(
      <WithActions
        title="Title"
        actions={undefined}
        fetchItems={fetchItems}
        renderList={renderList}
        saveItem={global.emptyFn}
      />
    );
    expect(getByText(/You are not allowed to display this page/)).toBeInTheDocument();
  });
  test('Shows permission error because of `show: false`', () => {
    const { getByText } = render(
      <WithActions
        title="Title"
        actions={{ show: false }}
        fetchItems={fetchItems}
        renderList={renderList}
        saveItem={global.emptyFn}
      />
    );
    expect(getByText(/You are not allowed to display this page/)).toBeInTheDocument();
  });
  test('Shows loading error', async () => {
    const { findByText } = render(
      <WithActions
        title="Title"
        actions={{ show: true, getItems: { URL: '', type: '' } }}
        fetchItems={() => Promise.reject()}
        renderList={renderList}
        saveItem={global.emptyFn}
      />
    );
    const errMsg = await findByText(/Error while loading the list/);
    expect(errMsg).toBeInTheDocument();
  });
  test('Shows loaded list', async () => {
    const { findByText } = render(
      <WithActions
        title="Title"
        actions={{ show: true, getItems: { URL: '', type: '' } }}
        fetchItems={fetchItems}
        renderList={renderList}
        saveItem={global.emptyFn}
      />
    );
    const listContent = await findByText(/Fake list content \(0 items\)/);
    expect(listContent).toBeInTheDocument();
  });
});
