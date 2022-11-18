export type TPagination<T = T> = {
  limit: number;
  page: number;
  total: number;
  data: T;
};

export enum TEnumSituation {
  location = "location",
  purchase = "purchase",
  sale = "sale",
  exchange = "exchange",
  sale_barter = "sale_barter",
  sale_lease = "sale_lease",
}
