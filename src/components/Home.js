import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Container, Grid, Typography, TextField, Card, CardContent, CardMedia, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './Home.css';
import { fetchAllBreeds, fetchBreedImage } from '../services/api';

const BreedModal = lazy(() => import('./BreedModal'));

const Home = () => {
  const [breeds, setBreeds] = useState({});
  const [breedImages, setBreedImages] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState('');
  const [openSubBreed, setOpenSubBreed] = useState({});
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [error, setError] = useState(''); // Add error state

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await fetchAllBreeds();
        setBreeds(data.message);

        const breedImagesPromises = Object.keys(data.message).map(async (breed) => {
          setLoadingImages(prev => ({ ...prev, [breed]: true }));
          const imageData = await fetchBreedImage(breed);
          setLoadingImages(prev => ({ ...prev, [breed]: false }));
          return { [breed]: imageData.message };
        });

        const breedImagesArray = await Promise.all(breedImagesPromises);
        const breedImagesObject = Object.assign({}, ...breedImagesArray);
        setBreedImages(breedImagesObject);
        setLoadingBreeds(false);
      } catch (error) {
        console.error('Error fetching breeds:', error);
        setError('Failed to fetch breeds'); // Set error message
        setLoadingBreeds(false);
      }
    };

    fetchBreeds();
  }, []);

  const handleBreedClick = (breed, subBreed = '') => {
    setSelectedBreed({ breed, subBreed });
    setOpenModal(true);
    setOpenSubBreed(prev => ({ ...prev, [breed]: false }));
  };

  const handleCloseModal = () => {
    setSelectedBreed(null);
    setOpenModal(false);
  };

  const handleSubBreedToggle = (breed) => {
    setOpenSubBreed(prev => ({ ...prev, [breed]: !prev[breed] }));
  };

  const filteredBreeds = Object.keys(breeds).filter(breed => {
    const breedMatches = breed.toLowerCase().includes(search.toLowerCase());
    const subBreedMatches = breeds[breed].some(subBreed =>
      subBreed.toLowerCase().includes(search.toLowerCase())
    );
    return breedMatches || subBreedMatches;
  });

  const sortedBreeds = filteredBreeds.sort((a, b) => {
    const searchLower = search.toLowerCase();
    const aStartsWithSearch = a.toLowerCase().startsWith(searchLower);
    const bStartsWithSearch = b.toLowerCase().startsWith(searchLower);

    if (aStartsWithSearch && !bStartsWithSearch) return -1;
    if (!aStartsWithSearch && bStartsWithSearch) return 1;
    return a.localeCompare(b);
  });

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>Dog Breeds</Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          label="Search Breeds"
          variant="outlined"
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {search && (
                  <IconButton onClick={() => setSearch('')}>
                    <CancelIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Typography variant="body1" className="result-count" style={{ marginTop: '8px', color: '#d32f2f' }}>
        {sortedBreeds.length} breeds found
      </Typography>
      {loadingBreeds ? (
        <div className="loading-indicator">
          <CircularProgress />
          <Typography variant="h6" align="center">Loading breeds...</Typography>
        </div>
      ) : error ? (
        <Typography variant="h5" align="center" color='error' style={{ marginTop: '150px' }}>
          {error}
        </Typography>
      ) : (
        <>
          {sortedBreeds.length === 0 ? (
            <Typography variant="h5" align="center" color='gray' style={{ marginTop: '150px' }}>
              No result found
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {sortedBreeds.map((breed) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={breed}>
                  <Card className="breed-card">
                    {loadingImages[breed] ? (
                      <div className="breed-card-loading">
                        <div className="pulse-loader"></div>
                      </div>
                    ) : (
                      <CardMedia
                        component="img"
                        className="breed-image"
                        image={breedImages[breed] || 'https://via.placeholder.com/140'}
                        alt={breed}
                        style={{ display: loadingImages[breed] ? 'none' : 'block' }}
                        onLoad={() => setLoadingImages(prev => ({ ...prev, [breed]: false }))}
                      />
                    )}
                    <CardContent className="breed-name-wrapper">
                      <Typography
                        variant="h6"
                        component="div"
                        className="breed-name"
                        onClick={() => handleBreedClick(breed)}
                      >
                        {breed.charAt(0).toUpperCase() + breed.slice(1)}
                      </Typography>
                      {breeds[breed].length > 0 && (
                        <div className="sub-breed-menu-wrapper">
                          <IconButton
                            onClick={() => handleSubBreedToggle(breed)}
                            className="top-arrow-icon"
                          >
                            <ArrowDropUpIcon />
                          </IconButton>
                          {openSubBreed[breed] && (
                            <div className="sub-breed-menu">
                              {breeds[breed].map(subBreed => (
                                <div
                                  key={subBreed}
                                  className="sub-breed-item"
                                  onClick={() => handleBreedClick(breed, subBreed)}
                                >
                                  {subBreed.charAt(0).toUpperCase() + subBreed.slice(1)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      <footer className="footer">
        <Typography variant="body2" color="textSecondary" align="center">
          © 2024 Dog Breeds. All rights reserved.
        </Typography>
      </footer>
      {selectedBreed && (
        <Suspense fallback={<div>Loading...</div>}>
          <BreedModal
            open={openModal}
            onClose={handleCloseModal}
            breed={selectedBreed.breed}
            subBreed={selectedBreed.subBreed}
          />
        </Suspense>
      )}
    </Container>
  );
};

export default Home;
