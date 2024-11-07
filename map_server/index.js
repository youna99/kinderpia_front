const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { transformCoordinates } = require('./transformCoordinates ');
require('dotenv').config();

console.log('.env 는 노션 Kinderpia 메인 페이지 제~일 밑에');
const app = express();

app.use(cors({
  origin: process.env.REACT_APP_MAP_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

let savedLocation = null;

app.get('/map/api/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: '검색어가 필요합니다.' });
  }

  try {
    const response = await axios.get(
      'https://openapi.naver.com/v1/search/local.json',
      {
        params: { 
          query,
          display: 5
        },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
      }
    );

    console.log('Search API Response:', response.data);
    
    const places = await Promise.all(response.data.items.map(async (item, index) => {
      const coordinates = await transformCoordinates(item.address, item.roadAddress);
      
      return {
        id: index,
        name: item.title.replace(/<[^>]*>/g, ''),
        address: item.address,
        roadAddress: item.roadAddress,
        coordinates: coordinates || { lat: null, lng: null }
      };
    }));

    res.json({ places });
  } catch (error) {
    console.error('검색 오류:', error);
    res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
  }
});

app.get('/map/api/coordinate', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: '검색어가 필요합니다.' });
  }

  try {
    const coordinates = await transformCoordinates(query, query);
    
    if (!coordinates) {
      return res.status(404).json({ error: '좌표를 찾을 수 없습니다.' });
    }

    const locationData = {
      name: query,
      address: query,
      coordinates: coordinates
    };

    res.json(locationData);
  } catch (error) {
    console.error('검색 오류:', error);
    res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});