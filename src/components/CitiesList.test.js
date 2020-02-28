import React from 'react';
import { render } from '@testing-library/react';
import CitiesList from './CitiesList';

describe('CitiesList', () => {
  test('Shows loader', () => {
    const { getByText } = render(<CitiesList countryCities={undefined} onStartEdit={() => {}} />);
    expect(getByText(/Loading cities.../i)).toBeInTheDocument();
  });

  test('Shows data', () => {
    const { getByText } = render(
      <CitiesList
        countryCities={{
          country: 'France',
          cities: [{ id: 'ID', name: 'Toulouse', description: '', countryCode: 'FR', order: 1 }],
        }}
        onStartEdit={() => {}}
      />
    );
    expect(getByText(/Country: France/)).toBeInTheDocument();
    expect(getByText(/Toulouse/)).toBeInTheDocument();
  });
});
