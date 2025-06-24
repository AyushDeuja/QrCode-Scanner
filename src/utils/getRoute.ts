import axios from 'axios';
import { ORS_API_KEY } from '@env';

export const getRoute = async (
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
) => {
  try {
    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/foot-walking/geojson',
      {
        coordinates: [
          [start.longitude, start.latitude],
          [end.longitude, end.latitude],
        ],
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching route:', error);
    return null;
  }
};
