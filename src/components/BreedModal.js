// BreedModal.js
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Modal, Backdrop, Fade, Box, Typography, IconButton, CircularProgress, Skeleton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchBreedImages } from '../services/api'; // Import the API function

const ImageGallery = lazy(() => import('./ImageGallery')); // Lazy load ImageGallery

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '70vh',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  p: 2,
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '8px',
  overflow: 'hidden',
};

const closeButtonStyle = {
  position: 'fixed',
  top: '30px',
  right: '30px', 
  color: 'gray',
  padding: '10px',
  zIndex: 1300,
};

const BreedModal = ({ open, onClose, breed, subBreed }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const breedName = subBreed ? `${breed} (${subBreed})` : breed;

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchBreedImages(breed, subBreed); // Use API function
        if (data && Array.isArray(data.message)) {
          setImages(data.message);
        } else {
          console.error('Unexpected response structure:', data);
          setImages([]); 
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setImages([]); 
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      setLoading(true);
      loadImages();
    }
  }, [open, breed, subBreed]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" align="center" style={{ marginBottom: '20px' }}>
              {breedName.charAt(0).toUpperCase() + breedName.slice(1)}
            </Typography>
            <Suspense
              fallback={
                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              }
            >
              {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                </Box>
              ) : (
                <ImageGallery images={images} />
              )}
            </Suspense>
          </Box>
        </Fade>
      </Modal>
      <IconButton onClick={onClose} style={closeButtonStyle}>
        <CloseIcon />
      </IconButton>
    </>
  );
};

export default BreedModal;
