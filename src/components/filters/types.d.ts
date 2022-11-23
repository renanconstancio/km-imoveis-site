export type TFiltersComp = {
  variant?: "row" | "col";
};

export type TFilters = {
  price_lte: string;
  price_gte: string;
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
