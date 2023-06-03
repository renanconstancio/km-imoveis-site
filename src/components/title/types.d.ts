export type TTitle = React.HTMLAttributes<HTMLHeadElement> & {
  title: string;
  mb?: "mb-5" | "mb-4" | "mb-3" | "mb-2" | "mb-1" | "mb-0.5";
  mt?: "mt-5" | "mt-4" | "mt-3" | "mt-2" | "mt-1" | "mt-0.5";
  variant?:
    | "text-base"
    | "text-2xl"
    | "text-4xl"
    | "sm:text-4xl"
    | "text-6xl"
    | "sm:text-4xl text-2xl";
};
