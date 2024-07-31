const BASE_URL = 'https://dog.ceo/api';

export const fetchAllBreeds = async () => {
  const response = await fetch(`${BASE_URL}/breeds/list/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch breeds');
  }
  return response.json();
};

export const fetchBreedImage = async (breed) => {
  const response = await fetch(`${BASE_URL}/breed/${breed}/images/random`);
  if (!response.ok) {
    throw new Error(`Failed to fetch image for breed ${breed}`);
  }
  return response.json();
};

// src/services/api.js

export const fetchBreedImages = async (breed, subBreed) => {
  const url = `${BASE_URL}/breed/${breed}${subBreed ? '/' + subBreed : ''}/images`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }
  return response.json();
};
