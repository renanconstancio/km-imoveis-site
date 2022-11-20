export type TLogs = {
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
