import { get } from 'axios';

const baseUrl = 'http://127.0.0.1:4723';

const getJobOffers = async (city, category) => {
  const { data } = await get(baseUrl, {
    params: {
      city,
      category
    }
  });

  return data;
};


export default getJobOffers;
