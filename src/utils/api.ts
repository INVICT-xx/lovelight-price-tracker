import axios from 'axios';

const API_URL = 'https://hourlypricing.comed.com/api';

export const fetchPriceData = async () => {
  try {
    const response = await axios.get(`${API_URL}?type=5minutefeed`);
    return response.data.map((item: any) => ({
      timestamp: new Date(item.millisUTC).toISOString(),
      price: parseFloat(item.price),
    }));
  } catch (error) {
    console.error('Error fetching price data:', error);
    throw error;
  }
};