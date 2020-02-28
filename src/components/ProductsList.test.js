import React from 'react';
import { render } from '@testing-library/react';
import ProductsList from './ProductsList';

describe('ProductsList', () => {
  test('Shows loader', () => {
    const { getByText } = render(<ProductsList products={undefined} onStartEdit={() => {}} />);
    expect(getByText(/Loading products.../i)).toBeInTheDocument();
  });

  test('Shows data', () => {
    const { getByText } = render(
      <ProductsList
        products={[{ id: 'ID', name: 'My cool product', description: '', status: '', order: 1 }]}
        onStartEdit={() => {}}
      />
    );
    expect(getByText(/My cool product/i)).toBeInTheDocument();
  });
});
