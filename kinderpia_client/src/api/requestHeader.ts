import axios from 'axios';

export const requestHeader = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  },
});
