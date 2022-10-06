import axios from "axios";
import imgAtest from "../assets/banners/banner-a.jpg";
import imgBtest from "../assets/banners/banner-b.jpg";
export const apiListOfHouses = [
  {
    title: "Casa Aluguel 1",
    address: "Joaquim Nabuco",
    district: "Centro",
    number: "100",
    city: "Itapolis",
    state: "SP",
    zip_code: "14900-000",
    price: 750.0,
    description: "Teste",
    tags: [
      "1 dorm",
      "sala",
      "despejo",
      "cozinha",
      "WC",
      "lavanderia",
      "garagem",
      "forrada",
    ],
    images: [
      {
        image: imgBtest,
      },
      {
        image: imgAtest,
      },
      {
        image: imgBtest,
      },
      {
        image: imgAtest,
      },
    ],
  },
  {
    title: "Casa Aluguel 2",
    address: "Joaquim Nabuco",
    district: "Centro",
    number: "100",
    city: "Itapolis",
    state: "SP",
    zip_code: "14900-000",
    price: 766.98,
    tags: [
      "1 dorm",
      "sala",
      "despejo",
      "cozinha",
      "WC",
      "lavanderia",
      "garagem",
      "forrada",
    ],
    images: [
      {
        image: imgAtest,
      },
      {
        image: imgBtest,
      },
      {
        image: imgBtest,
      },
      {
        image: imgAtest,
      },
    ],
  },
  {
    title: "Casa Aluguel 2",
    address: "Joaquim Nabuco",
    district: "Centro",
    number: "100",
    city: "Itapolis",
    state: "SP",
    zip_code: "14900-000",
    price: 766.98,
    tags: [
      "1 dorm",
      "sala",
      "despejo",
      "cozinha",
      "WC",
      "lavanderia",
      "garagem",
      "forrada",
    ],
    images: [
      {
        image: imgAtest,
      },
      {
        image: imgBtest,
      },
      {
        image: imgBtest,
      },
      {
        image: imgAtest,
      },
    ],
  },
  {
    title: "Casa Aluguel 2",
    address: "Joaquim Nabuco",
    district: "Centro",
    number: "100",
    city: "Itapolis",
    state: "SP",
    zip_code: "14900-000",
    price: 766.98,
    tags: [
      "1 dorm",
      "sala",
      "despejo",
      "cozinha",
      "WC",
      "lavanderia",
      "garagem",
      "forrada",
    ],
    images: [
      {
        image: imgAtest,
      },
      {
        image: imgBtest,
      },
      {
        image: imgBtest,
      },
      {
        image: imgAtest,
      },
    ],
  },
];

export const apiTypesOfProperty = [
  {
    type: "Residencial",
    childrens: [
      {
        type: "Casa",
      },
      {
        type: "Apartamento",
      },
    ],
  },
];

export const api = axios.create({
  baseURL: "http://localhost:8001/v1/",
});
