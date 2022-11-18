export type PropsPagination = React.InputHTMLAttributes<HTMLUListElement> & {
  total: number;
  currentPage: number;
  perPage: number;
};
