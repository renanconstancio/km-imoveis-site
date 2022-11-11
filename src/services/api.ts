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
      console.log("sadfsd");
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

export const tags = [
  { tag: "sala", icon: "faTv" },
  { tag: "cozinha", icon: "faSink" },
  { tag: "garagem", icon: "faCar" },
  { tag: "banheiro", icon: "faShower" },
  { tag: "2 banheiros", icon: "faShower" },
  { tag: "3 banheiros", icon: "faShower" },
  { tag: "1 dormitórios", icon: "faBed" },
  { tag: "2 dormitórios", icon: "faBed" },
  { tag: "3 dormitórios", icon: "faBed" },
  { tag: "4 dormitórios", icon: "faBed" },
  { tag: "copa", icon: "faSink" },
  { tag: "sala de star", icon: "faTv" },
  { tag: "sendo 1 suíte", icon: "faBath" },
  { tag: "sendo 2 suíte", icon: "faBath" },
  { tag: "ventilador", icon: "faFan" },
  { tag: "ar condicionado", icon: "faStarOfLife" },
  { tag: "garagem 2 carros", icon: "faCar" },
  { tag: "garagem 3 carros", icon: "faCar" },
  { tag: "garagem 4 carros", icon: "faCar" },
  { tag: "Portão Eletrônico", icon: "faCar" },
  { tag: "Interfone", icon: "faPhoneVolume" },
];
