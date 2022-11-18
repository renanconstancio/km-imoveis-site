import { TEnumSituation } from "../../global/types";

export type TFiltersComp = {
  variant?: "row" | "col";
};

export type TFilters = {
  category: string;
  district: string;
  city: string;
  reference: string;
  situation: TEnumSituation;
};
