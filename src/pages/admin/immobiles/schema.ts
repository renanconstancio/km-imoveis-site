import { z } from "zod";

export const schemaImmobileUser = {
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  creci: z.string(),
};

export const schemaImmobileTenant = {
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
};

export const schemaImmobileOwner = {
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
};

export const schemaImmobileCity = {
  id: z.string(),
  city: z.string(),
  state: z
    .object({
      id: z.string(),
      state: z.string(),
    })
    .optional(),
};

export const schemaImmobileStreet = {
  id: z.string(),
  street: z.string(),
};

export const schemaImmobileDistrict = {
  id: z.string(),
  district: z.string(),
};

export const schemaImmobileCategory = {
  id: z.string(),
  category: z.string(),
};

export const schemaImmobilePhotos = {
  position: z.number(),
  image_xs: z.string(),
  image_lg: z.string(),
  id: z.string(),
};

export const schemaImmobile = {
  id: z.string().optional(),
  users_id: z.string().optional().default(""),
  cities_id: z.string().optional().default(""),
  tenant_id: z.string().optional().default(""),
  neighborhoods_id: z.string().optional().default(""),
  streets_id: z.string().optional().default(""),
  categories_id: z.string().optional().default(""),
  owner_id: z.string().optional().default(""),
  number: z.string().optional(),
  description: z.string().min(1, { message: "Campo é obrigatório" }),
  description_text: z.string().optional().default(""),
  tags: z.string().optional(),
  reference: z.string().min(1, { message: "Campo é obrigatório" }),
  sale_price: z.string().optional(),
  rent_price: z.string().optional(),
  published: z.boolean().default(false),
  situation: z
    .enum([
      "location",
      "purchase",
      "sale",
      "exchange",
      "sale_barter",
      "sale_lease",
    ])
    .default("location"),
  pickup: z.string().optional(),
  building_area: z.string().optional(),
  terrain_area: z.string().optional(),
};

export const schemaImmobleZod = z.object({
  ...schemaImmobile,
  user: z.object(schemaImmobileUser).optional(),
  tenant: z.object(schemaImmobileTenant).optional(),
  owner: z.object(schemaImmobileOwner).optional(),
  city: z.object(schemaImmobileCity).optional(),
  street: z.object(schemaImmobileStreet).optional(),
  district: z.object(schemaImmobileDistrict).optional(),
  category: z.object(schemaImmobileCategory).optional(),
  photos: z.array(z.object(schemaImmobilePhotos)).optional(),
});
export type Immobile = z.output<typeof schemaImmobleZod>;

const schemaPhoto = z.object(schemaImmobilePhotos);
export type Photos = z.output<typeof schemaPhoto>;

export const schemaImmobleValidation = z.object(schemaImmobile);
export type ImmobileValidation = z.output<typeof schemaImmobleValidation>;
