export type TImmoblesUser = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  creci: string;
};

export type TImmoblesTenant = {
  id: string;
  first_name: string;
  last_name: string;
};

export type TImmoblesOwner = {
  id: string;
  first_name: string;
  last_name: string;
};

export type TImmoblesCity = {
  id: string;
  city: string;
  state: {
    id: string;
    state: string;
  };
};

export type TImmoblesStreet = {
  id: string;
  street: string;
};

export type TImmoblesDistrict = {
  id: string;
  district: string;
};

export type TImmoblesCategory = {
  id: string;
  category: string;
};

export type TImmoblesPhotos = {
  position: number;
  image_xs: string;
  image_lg: string;
  id: string;
};

export type TImmobles = {
  id: string;
  users_id: string;
  cities_id: string;
  tenant_id: string;
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
  user?: TImmoblesUser;
  tenant?: TImmoblesTenant;
  owner?: TImmoblesOwner;
  city?: TImmoblesCity;
  street?: TImmoblesStreet;
  district?: TImmoblesDistrict;
  category?: TImmoblesCategory;
  photos?: TImmoblesPhotos[];
};
