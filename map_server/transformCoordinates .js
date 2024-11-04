const axios = require('axios');

async function transformCoordinates(address, roadAddress) {
  try {
    let response = await axios.get(
      'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
        params: {
          query: address,
        },
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.GEOCODING_CLIENT_ID,
          'X-NCP-APIGW-API-KEY': process.env.GEOCODING_CLIENT_SECRET,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.data?.addresses?.length && roadAddress) {
      console.log('No result with address, trying roadAddress');
      response = await axios.get(
        'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
          params: {
            query: roadAddress,
          },
          headers: {
            'X-NCP-APIGW-API-KEY-ID': process.env.GEOCODING_CLIENT_ID,
            'X-NCP-APIGW-API-KEY': process.env.GEOCODING_CLIENT_SECRET,
            'Accept': 'application/json'
          }
        }
      );
    }

    console.log('API Response:', response.data);

    if (response.data?.addresses?.[0]) {
      const addressData = response.data.addresses[0];
      return {
        lat: parseFloat(addressData.y),
        lng: parseFloat(addressData.x)
      };
    }

    console.warn('No coordinates found for address:', address);
    return null;

  } catch (error) {
    console.error('Coordinate transformation error:', error.message);
    if (error.response) {
      console.error('API Error details:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    return null;
  }
}

module.exports = { transformCoordinates };