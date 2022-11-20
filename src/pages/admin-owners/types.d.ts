export type TOwners = {
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
