import axios from 'axios';

// Using a CORS proxy to access the API
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://hourlypricing.comed.com/api';

export const fetchPriceData = async () => {
  try {
    const response = await axios.get(`${PROXY_URL}${API_URL}?type=5minutefeed`);
    return response.data.map((item: any) => ({
      timestamp: new Date(item.millisUTC * 1).toISOString(), // Fix: multiply by 1 to ensure number conversion
      price: parseFloat(item.price),
    }));
  } catch (error) {
    console.error('Error fetching price data:', error);
    throw error;
  }
};