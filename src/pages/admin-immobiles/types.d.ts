export type PropsImmoblesUser = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  creci: string;
};

export type PropsImmoblesTenant = {
  id: string;
  first_name: string;
  last_name: string;
};

export type PropsImmoblesOwner = {
  id: string;
  first_name: string;
  last_name: string;
};

export type PropsImmoblesCity = {
  id: string;
  city: string;
  state: {
    id: string;
    state: string;
  };
};

export type PropsImmoblesStreet = {
  id: string;
  street: string;
};

export type PropsImmoblesDistrict = {
  id: string;
  district: string;
};

export type PropsImmoblesCategory = {
  id: string;
  category: string;
};

export type PropsImmoblesPhotos = {
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
  situation:
    | "location"
    | "purchase"
    | "sale"
    | "exchange"
    | "sale_barter"
    | "sale_lease";
  pickup: string;
  building_area: string;
  terrain_area: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  user?: PropsImmoblesUser;
  tenant?: PropsImmoblesTenant;
  owner?: PropsImmoblesOwner;
  city?: PropsImmoblesCity;
  street?: PropsImmoblesStreet;
  district?: PropsImmoblesDistrict;
  category?: PropsImmoblesCategory;
  photos?: PropsImmoblesPhotos[];
};
