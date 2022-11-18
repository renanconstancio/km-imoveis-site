export type PropsFiltersComp = {
  variant?: "row" | "col";
};

export type PropsFilters = {
  category: string;
  district: string;
  city: string;
  reference: string;
  situation:
    | "location"
    | "purchase"
    | "sale"
    | "exchange"
    | "sale_barter"
    | "sale_lease";
};
