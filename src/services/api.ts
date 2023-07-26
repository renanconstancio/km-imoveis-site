import axios, { Axios } from "axios";

export const api: Axios = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (response) => {
    const token = await JSON.parse(localStorage.getItem("user") || "");

    if (token?.token) {
      response.headers["authorization"] = `Bearer ${token?.token}`;
      // {
      //   ...response.headers,
      //   authorization: `Bearer ${token?.token}`,
      // };
    }

    return response;
  },
  (error) => Promise.reject(error),
);

export const interceptorsResponse = (logout: { (): void; (): void }) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        logout();
        return;
      }

      return Promise.reject(error);
    },
  );
};

export const tags = [
  { tag: "sala", icon: "faTv" },
  { tag: "cozinha", icon: "faSink" },
  { tag: "sem garagem", icon: "faWarehouse" },
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
  { tag: "sendo 1 suíte", icon: "faSpa" },
  { tag: "sendo 2 suíte", icon: "faSpa" },
  { tag: "sendo 3 suíte", icon: "faSpa" },
  { tag: "sendo 4 suíte", icon: "faSpa" },
  { tag: "sendo 5 suíte", icon: "faSpa" },
  { tag: "ventilador", icon: "faFan" },
  { tag: "ar condicionado", icon: "faWind" },
  { tag: "garagem 2 carros", icon: "faCar" },
  { tag: "garagem 3 carros", icon: "faCar" },
  { tag: "garagem 4 carros", icon: "faCar" },
  { tag: "Portão Eletrônico", icon: "faCar" },
  { tag: "Interfone", icon: "faPhoneVolume" },

  { tag: "Lavanderia", icon: "faJugDetergent" },
  { tag: "Área Gourmet", icon: "faBowlFood" },
  { tag: "Área Churraqueira", icon: "faUtensils" },
  { tag: "Piscina", icon: "faWaterLadder" },
  { tag: "Quarto de despejo", icon: "faDoorOpen" },
  { tag: "Cozinha americana", icon: "faKitchenSet" },
  { tag: "Jardim de inverno", icon: "faSnowflake" },

  { tag: "suíte com banheira", icon: "faSpa" },
  { tag: "lavabo", icon: "faSink" },
  { tag: "banheiro social", icon: "faShower" },
  { tag: "despensa", icon: "faCheck" },
  { tag: "poço artesiano", icon: "faCheck" },
  { tag: "piso porcelanato", icon: "faCheck" },
  { tag: "piso cerâmica", icon: "faCheck" },

  { tag: "cerca elétrica", icon: "faBolt" },
  { tag: "aquecedor solar", icon: "faSolarPanel" },
  { tag: "móveis planejados", icon: "faCheck" },
  { tag: "cozinha planejados", icon: "faCheck" },
  { tag: "banheiro planejados", icon: "faCheck" },
  { tag: "lavanderia planejados", icon: "faJugDetergent" },
  { tag: "quarto planejados", icon: "faCheck" },
  { tag: "aréa de lazer", icon: "faCheck" },
];
