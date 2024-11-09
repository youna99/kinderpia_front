const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { transformCoordinates } = require('./transformCoordinates ');
require('dotenv').config();

console.log('.env 는 노션 Kinderpia 메인 페이지 제~일 밑에');
const app = express();

const allowedOrigins = [
  // 개발 환경
  'http://localhost:3000',  // React 클라이언트 개발 서버
  'http://localhost:3001',  // React 어드민 개발 서버
  
  // 프로덕션 환경
  'http://ec2-3-38-150-41.ap-northeast-2.compute.amazonaws.com',
  'https://ec2-3-38-150-41.ap-northeast-2.compute.amazonaws.com',
  'http://ec2-3-38-150-41.ap-northeast-2.compute.amazonaws.com:3000',  // 클라이언트
  'http://ec2-3-38-150-41.ap-northeast-2.compute.amazonaws.com:3001',  // 어드민
  
  // 도메인이 있는 경우
  'http://kinderpia.com',
  'https://kinderpia.com',
  'http://admin.kinderpia.com',
  'https://admin.kinderpia.com',
  'http://www.kinderpia.com',
  'https://www.kinderpia.com'
];
const corsOptions = {
  origin: function(origin, callback) {
    // development 환경에서의 API 테스트 도구 허용 (Postman 등)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ['GET', 'POST'],  // 맵 서버는 검색 기능만 제공하므로 GET, POST만 허용
  credentials: true,  // 인증 정보 허용
  maxAge: 86400,     // preflight 요청 캐시 24시간
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
};

app.use(cors(corsOptions));

// CORS 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  if (err.message.startsWith('Not allowed by CORS')) {
    console.error('CORS Error:', err.message);
    res.status(403).json({
      error: 'CORS Error',
      message: '허용되지 않은 출처입니다.',
      origin: req.headers.origin
    });
  } else {
    next(err);
  }
});

app.use(express.json());

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