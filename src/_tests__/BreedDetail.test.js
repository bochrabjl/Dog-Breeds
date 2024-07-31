// src/_tests__/BreedDetail.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import BreedModal from '../components/BreedModal';
import { fetchBreedImages } from '../services/api';

// Mock the API module
jest.mock('../services/api');

test('renders BreedModal component with images', async () => {
  // Mock resolved value for fetchBreedImages
  fetchBreedImages.mockResolvedValue({
    message: ['image_url_1', 'image_url_2']
  });

  // Render the component with required props
  await act(async () => {
    render(
      <BreedModal
        open={true}
        onClose={() => {}}
        breed="beagle"
        subBreed=""
      />
    );
  });

});
