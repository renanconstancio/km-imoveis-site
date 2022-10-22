import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function useQueryObj() {
  return Object.fromEntries([...new URLSearchParams(useLocation().search)]);
}

export { useQuery, useQueryObj };
