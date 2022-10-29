export type PropsPhoto = {
  position: number;
  image_xs: string;
  image_lg: string;
  id: string;
};

export type PropsImmobles = {
  id: string;
  cities_id: string;
  neighborhoods_id: string;
  streets_id: string;
  categories_id: string;
  number: string;
  description: string;
  reference: string;
  sale_price: string;
  rent_price: string;
  published: "yes" | "no";
  situation: "leased" | "sold" | "available";
  pickup: string;
  building_area: string;
  terrain_area: string;
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
  photos?: PropsPhoto[];
};

export type PropsImmobilePagination = {
  limit: number;
  page: number;
  total: number;
  data: PropsImmobles[];
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

export type PropsDistrict = {
  id: string;
  district: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};
