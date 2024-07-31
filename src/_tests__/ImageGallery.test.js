
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from '../components/ImageGallery';
import { CircularProgress } from '@mui/material';

describe('ImageGallery', () => {
  test('shows loading spinner when loading is true', () => {
    render(<ImageGallery images={[]} loading={true} />);
    
    // Expect 9 spinners to be in the document
    expect(screen.getAllByRole('progressbar')).toHaveLength(9);
  });

  test('displays images when loading is false', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    render(<ImageGallery images={images} loading={false} />);
    
    // Use queryAllByAltText to get all images
    const imageElements = screen.queryAllByAltText(/Image \d+/);

    // Check if the number of images is correct
    expect(imageElements.length).toBe(images.length);

    // Check if each image has the correct src attribute
    images.forEach((image, index) => {
      expect(imageElements[index]).toHaveAttribute('src', image);
    });
  });
});
