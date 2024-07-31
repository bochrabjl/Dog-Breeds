import React from 'react';
import { Box, CardMedia, CircularProgress } from '@mui/material';

const imageContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  padding: '16px',
  boxSizing: 'border-box',
};

const columnStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
};

const ImageGallery = ({ images, loading }) => {
  const columns = [[], [], []];
  images.forEach((image, index) => {
    columns[index % 3].push(image);
  });

  return (
    <Box sx={imageContainerStyle}>
      {loading ? (
        Array.from({ length: 9 }).map((_, index) => (
          <Box key={index} style={{ position: 'relative', padding: '16px' }}>
            <CircularProgress 
              size={100} 
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)' 
              }} 
            />
          </Box>
        ))
      ) : (
        columns.map((column, columnIndex) => (
          <Box key={columnIndex} sx={columnStyle}>
            {column.map((image, index) => (
              <Box key={index} style={{ position: 'relative', padding: '16px' }}>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Image ${index + 1}`}
                  style={imageStyle}
                />
              </Box>
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};

export default ImageGallery;
