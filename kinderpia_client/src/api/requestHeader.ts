import axios from 'axios';

export const requestHeader = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});