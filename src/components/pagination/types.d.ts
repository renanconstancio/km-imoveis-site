export type TPagination = React.InputHTMLAttributes<HTMLUListElement> & {
  total: number;
  currentPage: number;
  perPage: number;
};
