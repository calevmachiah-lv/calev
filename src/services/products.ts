import { getParams } from '../utils/function/navigationParams';
import axios from 'axios';

const location = window.location.host.includes('localhost');
const baseURL = location
  ? 'http://localhost:5000'
  : `https://${window.location.host}`;

export const getProduct = async (id: string) => {
  try {
    const response = await fetchProduct(id);
    return response;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const fetchProduct = async (id: string) => {
  const { appName, token, timestamp } = getParams();

  try {
    const response = await axios.get(`${baseURL}/api/getCatalogProduct`, {
      params: { id, appName, token, timestamp },
    });

    if (response.status !== 200) {
      throw new Error('HTTP error! status: ' + response.status);
    }

    const data = response?.data;

    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
