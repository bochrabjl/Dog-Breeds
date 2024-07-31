// App.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App'; // Update path if needed
import '@testing-library/jest-dom';

jest.mock('../components/Home', () => () => <div>Home Component</div>);
jest.mock('../components/BreedDetail', () => () => <div>BreedDetail Component</div>);

describe('App Routing', () => {
  test('renders Home component on root route', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Home Component/i)).toBeInTheDocument());
  });

  test('renders BreedDetail component on /breed/:breed route', async () => {
    render(
      <MemoryRouter initialEntries={['/breed/labrador']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/BreedDetail Component/i)).toBeInTheDocument());
  });
});
