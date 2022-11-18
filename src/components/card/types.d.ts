type PropsCard = React.HTMLAttributes<HTMLLIElement> & {
  reference: string;
  description: string;
  terrainArea: string;
  buildingArea: string;
  address: string[];
  salePrice: string;
  rentPrice: string;
  images: string[];
  situation:
    | "exchange"
    | "location"
    | "purchase"
    | "sale"
    | "sale_barter"
    | "sale_lease";
  // city?: {
  //   city: string;
  //   state: {
  //     state: string;
  //   };
  // };
  tags: {
    tag: string;
    icon: string;
  }[];
  tag: string;
};
