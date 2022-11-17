export type PropsFiltersComp = {
  variant?: "row" | "col";
};

export type PropsFilters = {
  category: string;
  district: string;
  city: string;
  reference: string;
  situation: string | "location" | "purchase" | "sale" | "exchange";
};
