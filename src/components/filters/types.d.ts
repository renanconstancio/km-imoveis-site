export type TFiltersComp = {
  variant?: "row" | "col";
};

export type TFilters = {
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
