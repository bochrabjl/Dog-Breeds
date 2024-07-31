import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import Home from '../components/Home';
import { fetchAllBreeds, fetchBreedImage } from '../services/api';

jest.mock('../services/api');

test('renders Home component', async () => {
  fetchAllBreeds.mockResolvedValue({
    message: {
      beagle: [],
      bulldog: []
    }
  });

  fetchBreedImage.mockResolvedValue({
    message: 'image_url'
  });

  await act(async () => {
    render(<Home />);
  });

  await waitFor(() => {
    expect(screen.getByText(/beagle/i)).toBeInTheDocument();
    expect(screen.getByText(/bulldog/i)).toBeInTheDocument();
  });
  
  
});

