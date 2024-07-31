//BreedDetail.js
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';
import { fetchBreedImages } from '../services/api'; 

const ImageGallery = lazy(() => import('./ImageGallery')); // Lazy load ImageGallery

function BreedDetail() {
  const { breed, subBreed } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchBreedImages(breed, subBreed); 
        setImages(data.message);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [breed, subBreed]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {breed.charAt(0).toUpperCase() + breed.slice(1)} {subBreed ? subBreed.charAt(0).toUpperCase() + subBreed.slice(1) : ''}
      </Typography>
      <Suspense fallback={<CircularProgress />}>
        <ImageGallery images={images} loading={loading} />
      </Suspense>
    </Container>
  );
}

export default BreedDetail;
