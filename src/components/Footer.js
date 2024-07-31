// src/Footer.js
import React from 'react';
import { Typography, Container } from '@mui/material';
import './Footer.css'; // Create this CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; {new Date().getFullYear()} Dog Breeds. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
