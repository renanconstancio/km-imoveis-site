import { Link, useLocation } from "react-router-dom";
import { parse, stringify } from "query-string";

export type TPagination = React.InputHTMLAttributes<HTMLUListElement> & {
  total: number;
  currentPage: number;
  perPage: number;
};

export function Pagination({
  total,
  currentPage,
  perPage,
  ...rest
}: TPagination) {
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const location = useLocation();

  return (
    <ul className="flex flex-1 gap-0.5" {...rest}>
      {pageNumbers.map((number, index) => {
        const parsed = parse(location.search);

        return number >= currentPage - 3 && number <= currentPage + 3 ? (
          <li className="flex" key={index}>
            <Link
              to={{
                pathname: location.pathname,
                search: stringify({ ...parsed, page: number }),
              }}
              className={`${
                number === currentPage && "bg-gray-300 text-gray-700 font-bold"
              } hover:bg-gray-300 hover:font-bold px-3 py-1 rounded-md`}
            >
              {number}
            </Link>
          </li>
        ) : null;
      })}
    </ul>
  );
}
