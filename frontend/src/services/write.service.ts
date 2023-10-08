import axios from "axios";

export const getAll = async () => {
  const url = import.meta.env.VITE_WRITE_SERVICE_API_URL;
  const data = await axios.get(`${url}/getAll`);
  return data;
};
