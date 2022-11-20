export type TCities = {
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
