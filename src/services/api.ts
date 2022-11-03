import axios, { Axios } from "axios";

export const api: Axios = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async config => {
    const token = await JSON.parse(localStorage.getItem("user") || "");

    if (token?.token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token?.token}`,
      };
    }

    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      // const result = await memoizedRefreshToken();

      // if (result?.accessToken) {
      //   config.headers = {
      //     ...config.headers,
      //     authorization: `Bearer ${result?.accessToken}`,
      //   };
      // }

      return axios(config);
    }
    return Promise.reject(error);
  },
);
