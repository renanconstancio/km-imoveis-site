import { Link, useLocation } from "react-router-dom";
import { parse, stringify } from "query-string";

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
};

export function Pagination({ total, currentPage, perPage }: Props) {
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const location = useLocation();

  return (
    <ul className="flex flex-1 justify-end gap-1 mb-5 items-center">
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
                number === currentPage && "bg-gray-700 text-white font-bold"
              } hover:bg-gray-700 hover:text-white hover:font-bold px-2 rounded-sm flex-1`}
            >
              {number}
            </Link>
          </li>
        ) : null;
      })}
    </ul>
  );
}
