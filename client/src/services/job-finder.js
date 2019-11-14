import { get } from "axios";

const getJobOffers = async (route, city, category) => {
  const { data } = await get(`http://localhost:4000/${route}`, {
    params: {
      city,
      category
    }
  });

  return data;
};

export default getJobOffers;
