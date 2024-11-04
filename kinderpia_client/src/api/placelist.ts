import { requestHeader } from './requestHeader';
import { defaultPostReq } from '../types/place';

export const getPlaces = async (params: {
  sort: string;
  page: number;
  size: number;
  category?: string;
  keyword?: string;
}) => {
  const response = await requestHeader.get('/api/place', { params });
  return response.data;
};

export const getDefaultPlaceList = async (
  page: number = 1,
  size: number = 6
) => {
  const response = await requestHeader.get('/api/place', {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

// export const getSearchPlaceList = async (data: defaultPostReq) => {
//   const params = new URLSearchParams();
//   params.append('sort', data.sort || 'date');
//   params.append('page', String(data.page || 0));
//   params.append('size', String(data.size || 10));
//   params.append('category', data.category || 'all');
//   params.append('keyword', data.keyword || 'none');

//   const response = await requestHeader.get(
//     '/api/place',
//     { params }
//     // headers: {
//     //   'Content-Type': 'application/x-www-form-urlencoded',
//     // },
//   );

//   return response;
// };

// export const getSearchPlaceList = async (params: {
//   category: string;
//   keyword: string;
// }) => {
//   const response = await requestHeader.get('/api/place', { params });
//   return response.data;
// };

export const getSearchPlaceList = async (data: defaultPostReq) => {
  const response = await requestHeader.post(
    '/api/place',
    {
      category: data.category,
      keyword: data.keyword,
      page: data.page,
      size: data.size,
    },
    {
      params: {
        category: data.category,
        keyword: data.keyword,
        page: data.page,
        size: data.size,
      },
    }
  );
  return response;
};

export const getPlace = async (placeId: any) => {
  try {
    const response = await requestHeader.get(`/api/place/${placeId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error(`장소를 찾을 수 없습니다. PlaceId: ${placeId}`);
    }
    throw error;
  }
};
