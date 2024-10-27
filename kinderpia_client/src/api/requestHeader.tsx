import axios from 'axios';

export const requsetHeader = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000', // 서버 주소로 변경 필요함
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});