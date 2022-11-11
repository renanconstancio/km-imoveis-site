export type PropsPagination<T = T> = {
  limit: number;
  page: number;
  total: number;
  data: T;
};

export type PropsLogs = {
  created_at: string;
  users_id?: string | null;
  type: "access" | "create" | "update" | "delete";
  route: string;
  text: any;
  user?: {
    type: string;
    email: string;
    first_name?: string;
  };
};

export type PropsUsers = {
  id: string;
  type: string;
  email: string;
  first_name: string;
  last_name: string | null;
  creci: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type PropsPhoto = {
  position: number;
  image_xs: string;
  image_lg: string;
  id: string;
};

export type PropsImmobles = {
  id: string;
  users_id: string;
  cities_id: string;
  neighborhoods_id: string;
  streets_id: string;
  categories_id: string;
  owner_id: string | null;
  tenant_id: string | null;
  number: string;
  description: string;
  description_text: string;
  tags: string;
  reference: string;
  sale_price: string;
  rent_price: string;
  published: true | false;
  situation: "exchange" | "location" | "purchase" | "sale";
  pickup: string;
  building_area: string;
  terrain_area: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    creci: string;
  };
  tenant?: {
    id: string;
    first_name: string;
    last_name: string;
  };
  owner?: {
    id: string;
    first_name: string;
    last_name: string;
  };
  city?: {
    id: string;
    city: string;
    state: {
      id: string;
      state: string;
    };
  };
  street?: {
    id: string;
    street: string;
  };
  district?: {
    id: string;
    district: string;
  };
  category?: {
    id: string;
    category: string;
  };
  photos?: PropsPhoto[];
};

export type PropsCategories = {
  id: string;
  category: string;
  filter: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type PropsStreets = {
  id: string;
  street: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type PropsNeighborhoods = {
  id: string;
  district: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type PropsCities = {
  id: string;
  city: string;
  states_id: string;
  state: {
    id: string;
    state: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type PropsCategory = {
  id: string;
  category: string;
  filter: "yes" | "no";
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type PropsStreet = {
  id: string;
  zip_code: string;
  street: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type PropsStates = {
  id: string;
  state: string;
  street: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type PropsDistrict = {
  id: string;
  district: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type PropsBanners = {
  id: string;
  reference: string;
  description: string;
  sale_price: string;
  rent_price: string;
  photos: {
    id: string;
    image_lg: string;
    image_xs: string;
    position: string;
  };
};

export type PropsCustomers = {
  id: string;
  type: string | "owner" | "tenant";
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
  rg: string;
  cnpj: string;
  ie: string;
  phone: string;
  cc_bank: string;
  ag_bank: string;
  pix_bank: string;
  rent_value: string;
  rental_value: string;
  number: string;
  streets_id: string;
  neighborhoods_id: string;
  cities_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  city?: {
    id: string;
    city: string;
    state: {
      id: string;
      state: string;
    };
  };
  street?: {
    id: string;
    street: string;
  };
  district?: {
    id: string;
    district: string;
  };
};

export type PropsDashboard = {
  totalImmobiles: number;
  totalImmobilesSale: number;
  totalImmobilesLocation: number;
  totalImmobilesExchange: number;
  totalImmobilesPurchase: number;
};

export type PropsWhatsapp = {
  text: string;
  phone: number;
};
