export type PropsImmobles = {
  id: string;
  cities_id: string;
  neighborhoods_id: string;
  streets_id: string;
  categories_id: string;
  number: string;
  description: string;
  sale_price: number;
  rent_price: number;
  published: "yes" | "no";
  situation: "leased" | "sold" | "available";
  created_at: string;
  updated_at: string;
  deleted_at: string;
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
  filter: string;
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

export type PropsDistrict = {
  id: string;
  district: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};
