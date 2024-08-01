import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

export const registerUser = (userData) => {
  return axios.post(`${BASE_URL}/registro`, userData);
};
