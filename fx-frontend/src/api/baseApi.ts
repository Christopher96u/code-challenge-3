import axios from "axios";

const baseApiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
export { baseApiClient };
