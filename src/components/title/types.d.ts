export type TTitle = React.HTMLAttributes<HTMLHeadElement> & {
  title: string;
  variant?:
    | "text-base"
    | "text-2xl"
    | "text-4xl"
    | "sm:text-4xl"
    | "text-6xl"
    | "sm:text-4xl text-2xl";
};
