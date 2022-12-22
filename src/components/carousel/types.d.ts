export type TCarousel = {
  reference: string;
  description: string;
  situation:
    | "exchange"
    | "location"
    | "purchase"
    | "sale"
    | "sale_barter"
    | "sale_lease";
  state: string;
  city: string;
  photo: {
    image_lg: string;
    image_xs: string;
  };
};

export type TBanner = {
  link?: string;
  title: string;
  description?: string;
  photo: {
    image_lg: string;
    image_xs: string;
  };
};
