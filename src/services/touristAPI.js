// touristAPI.js
import axios from 'axios';

const API_KEY = 'eab924414fmsh453704db5cac159p1dbe63jsn60ff7f5934c9';
const BASE_URL = 'https://api.opentripmap.com/0.1/en/places';

// Função para buscar pontos turísticos próximos
export const fetchTouristSpots = async (latitude, longitude) => {
  const response = await axios.get(`${BASE_URL}/radius`, {
    params: {
      apiKey: API_KEY,
      radius: 5000,
      lat: latitude,
      lon: longitude,
    },
  });
  return response.data;
};
