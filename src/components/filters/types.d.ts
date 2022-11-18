import { PropsEnumSituation } from "../../global/types";

export type PropsFiltersComp = {
  variant?: "row" | "col";
};

export type PropsFilters = {
  category: string;
  district: string;
  city: string;
  reference: string;
  situation: PropsEnumSituation;
};
