import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import {
  faFolderOpen,
  faImage,
  faSave,
  faUndo,
  faBath,
  faBed,
  faCar,
  faExpand,
  faFan,
  faShower,
  faSink,
  faTv,
  faPhoneVolume,
  faKitchenSet,
  faSnowflake,
  faJugDetergent,
  faBowlFood,
  faWaterLadder,
  faUtensils,
  faDoorOpen,
  faWind,
  faWarehouse,
  faSpa,
  faCheck,
  faBolt,
  faSolarPanel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  ModalCategory,
  ModalStreet,
  ModalDistrict,
  ModalCity,
  ModalPhoto,
  ModalTenant,
  ModalOwner,
} from "../../../components/modal";

import { maskCurrency, maskCurrencyUs } from "../../../utils/mask";
import { SEO } from "../../../components/seo";
import { api, tags } from "../../../services/api";

import { City } from "../cities/form";
import { Neighborhood } from "../neighborhoods/form";
import { Street } from "../streets/form";
import { Category } from "../categories/form";
import { Tenant } from "../tenant/form";
import { Owner } from "../owners/form";
import { useModal } from "../../../hooks/use-modal";
import { Input } from "../../../components/inputs";
import { OptionSituation } from "../../../components/option-situation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Immobile,
  ImmobileValidation,
  schemaImmobleValidation,
} from "./schema";
import { toast } from "react-toastify";
import { User } from "../users/list";

export default function FormImmobles() {
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [tagsSite, setTagsSite] = useState<string[]>([]);
  const [onOff, setOnOff] = useState<boolean>(false);

  const {
    openCategory,
    closeCategory,
    openStreet,
    closeStreet,
    openNeighborhoods,
    closeNeighborhoods,
    openCity,
    closeCity,
    openPhoto,
    closePhoto,
    openTenant,
    closeTenant,
    openOwner,
    closeOwner,
  } = useModal();

  const navigate = useNavigate();

  const { immobleId } = useParams<{ immobleId: string | undefined }>();

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Immobile>({
    resolver: zodResolver(schemaImmobleValidation),
  });

  const { data: cities } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => api.get(`/cities`).then(async (res) => res.data),
  });

  const { data: neighborhoods } = useQuery<Neighborhood[]>({
    queryKey: ["neighborhoods"],
    queryFn: () => api.get(`/neighborhoods`).then(async (res) => res.data),
  });

  const { data: streets } = useQuery<Street[]>({
    queryKey: ["streets"],
    queryFn: () => api.get(`/streets`).then(async (res) => res.data),
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => api.get(`/categories`).then(async (res) => res.data),
  });

  const { data: tenants } = useQuery<Tenant[]>({
    queryKey: ["tenants"],
    queryFn: () =>
      api
        .get(`/customers?limit=10000&search[type]=tenant`)
        .then(async (res) => await res.data?.data),
  });

  const { data: owners } = useQuery<Owner[]>({
    queryKey: ["owners"],
    queryFn: () =>
      api
        .get(`/customers?limit=10000&search[type]=owner`)
        .then(async (res) => res.data?.data),
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => api.get(`/users`).then(async (res) => res.data),
  });

  const { data: codeReference } = useQuery<string>({
    queryKey: ["codeReference"],
    queryFn: () =>
      api
        .get(`/immobiles?limit=1&order[reference]=desc`)
        .then(async (res) =>
          `${Number((await res.data)?.data?.[0]?.reference) + 1}`.padStart(
            3,
            "0",
          ),
        ),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: ImmobileValidation) => {
      const tags = tagsSite.length ? tagsSite.join(",") : null;

      const newData = {
        ...data,
        sale_price: maskCurrencyUs(`${data.sale_price || 0}`),
        rent_price: maskCurrencyUs(`${data.rent_price || 0}`),
        tags: tags,
        published: onOff,
        description_text: descriptionText,
        streets_id: streets?.find((item) => item.street === data.streets_id)
          ?.id,
        cities_id: cities?.find(
          (item) => [item.city, item.state?.state].join("/") === data.cities_id,
        )?.id,
        neighborhoods_id: neighborhoods?.find(
          (item) => item.district === data.neighborhoods_id,
        )?.id,
        categories_id: categories?.find(
          (item) => item.category === data.categories_id,
        )?.id,
        tenant_id: tenants?.find((item) => item.first_name === data.tenant_id)
          ?.id,
        owner_id: owners?.find((item) => item.first_name === data.owner_id)?.id,
        users_id: users?.find((item) => item.first_name === data.users_id)?.id,
      };
      return await api.patch(`/immobiles`, { ...newData });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async (resp) => {
      toast.success("Cadastro salvo com sucesso!");
      navigate({
        pathname: `/adm/immobiles/${await resp.data?.id}/edit`,
      });
    },
  });

  useQuery({
    queryKey: ["immobiles", immobleId],
    queryFn: () => {
      if (!immobleId) return null;
      return api
        .get<Immobile>(`/immobiles/${immobleId}`)
        .then(async (res) => res.data);
    },
    onSuccess: (data) => {
      if (data) {
        const newData = {
          ...data,
          sale_price: maskCurrency(`${data.sale_price}`),
          rent_price: maskCurrency(`${data.rent_price}`),
          users_id: data.user?.first_name,
          categories_id: data.category?.category,
          neighborhoods_id: data?.district?.district,
          streets_id: data.street?.street,
          cities_id:
            data.city?.city &&
            data.city?.state?.state &&
            [data.city?.city, data.city?.state?.state].join("/"),
          owner_id:
            data.owner?.first_name &&
            data.owner?.last_name &&
            [data.owner?.first_name, data.owner?.last_name].join(" ").trim(),
          tenant_id:
            data.tenant?.first_name &&
            data.tenant?.last_name &&
            [data.tenant?.first_name, data.tenant?.last_name].join(" ").trim(),
        };

        reset(newData);

        const tags: string[] = data?.tags?.split(",") || [];
        setTagsSite(tags);
        setDescriptionText(data?.description_text);
        setOnOff(data?.published);
      }
    },
  });

  return (
    <>
      <SEO
        title={`${immobleId ? "Editar " : "Cadastrar"} Imóveis`}
        siteTitle={import.meta.env.VITE_TITLE}
      />

      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex flex-row justify-between">
          <aside className="flex flex-row gap-3">
            <button className="btn-success btn-ico" type="submit" form="form">
              <FontAwesomeIcon icon={faSave} />
              <span>Salvar</span>
            </button>
            {immobleId && (
              <button
                className="btn-primary btn-ico"
                type="button"
                onClick={() => closePhoto(!openPhoto)}
              >
                <FontAwesomeIcon icon={faImage} />
                <span>{watch("photos")?.length} Fotos</span>
              </button>
            )}
            <Link
              className="btn-warning btn-ico"
              to="/adm/immobiles?order[reference]=desc"
            >
              <FontAwesomeIcon icon={faUndo} />
              <span>Voltar</span>
            </Link>
          </aside>
          <aside>
            <span
              className={`w-28 h-10 ${
                !onOff
                  ? "bg-red-300 text-red-700"
                  : "bg-green-300 text-green-700"
              } flex items-center justify-center font-play text-xl cursor-pointer`}
              onClick={() => setOnOff(!onOff)}
            >
              {!onOff ? "OFFLINE" : "ONLINE"}
            </span>
          </aside>
        </div>
        <form
          className="basis-full"
          id="form"
          onSubmit={handleSubmit(async (data) => mutate(data))}
        >
          <div className="flex flex-wrap -mx-3">
            <div className="basis-full md:basis-2/12 px-3">
              <Input
                type="text"
                label="CÓD. *"
                className={`input-form ${
                  errors.reference && "invalid"
                } text-end`}
                error={errors.reference}
                defaultValue={codeReference}
                register={register("reference")}
              />
            </div>
            <div className="basis-full md:basis-6/12 px-3">
              <Input
                type="text"
                label="Descrição do Imóvel * "
                className={`input-form ${errors.description && "invalid"}`}
                error={errors.description}
                register={register("description")}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3">
              <label className="label-form" htmlFor="situation">
                Situação
              </label>
              <div className="relative">
                <select className="input-form" {...register("situation")}>
                  <OptionSituation />
                </select>
              </div>
            </div>

            <div className="basis-full mb-6"></div>
            <div className="basis-full md:basis-4/12 px-3 mb-6">
              <label className="label-form" htmlFor="users_id">
                Captador
              </label>
              <div className="flex ">
                <span className="flex-1">
                  <input
                    list="users_id"
                    type="search"
                    className={`input-form ${errors.users_id && "invalid"}`}
                    placeholder="Pesquisar..."
                    {...register("users_id")}
                  />
                </span>
              </div>
              {errors.users_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="users_id">
                {users &&
                  users
                    ?.filter((f) => f.type !== "root")
                    .map(({ id, first_name }) => (
                      <option key={id} value={first_name} />
                    ))}
              </datalist>
            </div>
            <div className="basis-full md:basis-4/12 px-3">
              <Input
                type="text"
                label="Captador/Outros"
                className={`input-form ${errors.pickup && "invalid"}`}
                error={errors.pickup}
                register={register("pickup")}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="basis-full md:basis-3/12 px-3 mb-6">
              <Input
                type="text"
                label="Área de Construção (m²)"
                className={`input-form ${errors.building_area && "invalid"}`}
                error={errors.building_area}
                register={register("building_area")}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3  mb-6">
              <Input
                type="text"
                label="Área Terrea (m²)"
                className={`input-form ${errors.terrain_area && "invalid"}`}
                error={errors.terrain_area}
                register={register("terrain_area")}
              />
            </div>
            <div className="basis-full md:basis-2/12 px-3  mb-6">
              <Input
                type="tel"
                mask={maskCurrency}
                label="Pr.Venda."
                className={`input-form ${errors.sale_price && "invalid"}`}
                error={errors.sale_price}
                register={register("sale_price")}
              />
            </div>
            <div className="basis-full md:basis-2/12 px-3  mb-6">
              <Input
                type="tel"
                mask={maskCurrency}
                label="Pr.Aluguel."
                className={`input-form ${errors.rent_price && "invalid"}`}
                error={errors.rent_price}
                register={register("rent_price")}
              />
            </div>

            <div className="basis-full md:basis-4/12 px-3 mb-6">
              <label className="label-form" htmlFor="categories_id">
                Categoria
              </label>
              <div className="flex">
                <span className="flex-1">
                  <input
                    list="categories_id"
                    type="search"
                    className={`input-form ${
                      errors.categories_id && "invalid"
                    }`}
                    placeholder="Pesquisar..."
                    {...register("categories_id")}
                  />
                </span>
                <span
                  className="ml-3 btn-primary self-center cursor-pointer flex text-xl"
                  onClick={() => closeCategory(!openCategory)}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                </span>
              </div>
              {errors.categories_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="categories_id">
                {categories?.map(({ id, category }) => (
                  <option key={id} value={[category].join(", ")} />
                ))}
              </datalist>
            </div>
            {/* </div>
          <div className="flex flex-wrap -mx-3"> */}
            <div className="basis-full md:basis-6/12 px-3 mb-6">
              <label className="label-form" htmlFor="streets_id">
                Rua
              </label>
              <div className="flex">
                <span className="flex-1">
                  <input
                    list="streets_id"
                    type="search"
                    className={`input-form ${errors.streets_id && "invalid"}`}
                    placeholder="Pesquisar..."
                    {...register("streets_id")}
                  />
                </span>
                <span
                  className="ml-3 btn-primary self-center cursor-pointer flex text-xl"
                  onClick={() => closeStreet(!openStreet)}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                </span>
              </div>
              {errors.streets_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="streets_id">
                {streets?.map(({ id, street }) => (
                  <option key={id} value={street} />
                ))}
              </datalist>
            </div>
            <div className="basis-full md:basis-2/12 px-3">
              <label className="label-form" htmlFor="number">
                Número Casa
              </label>
              <input
                type="text"
                className={`input-form ${errors.number && "invalid"}`}
                {...register("number")}
              />
              {errors.number && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
            </div>

            <div className="basis-full md:basis-4/12 px-3 mb-6">
              <label className="label-form" htmlFor="neighborhoods_id">
                Bairro
              </label>
              <div className="flex ">
                <span className="flex-1">
                  <input
                    list="neighborhoods_id"
                    type="search"
                    className={`input-form ${
                      errors.neighborhoods_id && "invalid"
                    }`}
                    placeholder="Pesquisar..."
                    {...register("neighborhoods_id")}
                  />
                </span>
                <span
                  className="ml-3 btn-primary self-center cursor-pointer flex text-xl"
                  onClick={() => closeNeighborhoods(!openNeighborhoods)}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                </span>
              </div>
              {errors.neighborhoods_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="neighborhoods_id">
                {neighborhoods?.map(({ id, district }) => (
                  <option key={id} value={[district].join(", ")} />
                ))}
              </datalist>
            </div>
            <div className="basis-full md:basis-4/12 px-3 mb-6">
              <label className="label-form" htmlFor="cities_id">
                Cidade
              </label>
              <div className="flex">
                <span className="flex-1">
                  <input
                    list="cities_id"
                    type="search"
                    className={`input-form ${errors.cities_id && "invalid"}`}
                    placeholder="Pesquisar..."
                    {...register("cities_id")}
                  />
                </span>
                <span
                  className="ml-3 btn-primary self-center cursor-pointer flex text-xl"
                  onClick={() => closeCity(!openCity)}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />{" "}
                </span>
              </div>
              {errors.cities_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="cities_id">
                {cities?.map((city) => (
                  <option
                    key={city.id}
                    value={[city.city, city?.state?.state].join("/")}
                  />
                ))}
              </datalist>
            </div>

            <div className="basis-full md:basis-6/12 px-3 mb-6">
              <label className="label-form" htmlFor="tenant_id">
                Locatário
              </label>
              <div className="flex ">
                <span className="flex-1">
                  <input
                    list="tenant_id"
                    type="search"
                    className={`input-form ${errors.tenant_id && "invalid"}`}
                    placeholder="Pesquisar..."
                    {...register("tenant_id")}
                  />
                </span>
                <span
                  className="ml-3 btn-primary self-center cursor-pointer flex text-xl"
                  onClick={() => closeTenant(!openTenant)}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                </span>
              </div>
              {errors.tenant_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="tenant_id">
                {tenants?.map(({ id, first_name, last_name }) => (
                  <option key={id} value={[first_name, last_name].join(" ")} />
                ))}
              </datalist>
            </div>
            <div className="basis-full md:basis-6/12 px-3 mb-6">
              <label className="label-form" htmlFor="owner_id">
                Proprietário
              </label>
              <div className="flex">
                <span className="flex-1">
                  <input
                    list="owner_id"
                    type="search"
                    className={`input-form ${errors.owner_id && "invalid"}`}
                    placeholder="Pesquisar..."
                    {...register("owner_id")}
                  />
                </span>
                <span
                  className="ml-3 btn-primary self-center cursor-pointer flex text-xl"
                  onClick={() => closeOwner(!openOwner)}
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                </span>
              </div>
              {errors.owner_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="owner_id">
                {owners?.map(({ id, first_name, last_name }) => (
                  <option key={id} value={[first_name, last_name].join(" ")} />
                ))}
              </datalist>
            </div>
            <div className="basis-full px-3 mb-6">
              <label className="label-form">Outras Info</label>
              <hr className="mb-5" />
              <div className="flex flex-wrap">
                {tags.map((label, k) => (
                  <div key={k} className="basis-1/4 capitalize">
                    <span
                      className={`p-3 block rounded-md m-1 ${
                        tagsSite?.includes(label.tag)
                          ? "bg-green-200"
                          : "hover:bg-green-300"
                      }`}
                      onClick={() => {
                        if (tagsSite?.includes(label.tag)) {
                          setTagsSite(
                            tagsSite?.filter((item) => {
                              return item !== label.tag;
                            }),
                          );
                          return;
                        }
                        setTagsSite((old) => [...old, label.tag]);
                      }}
                    >
                      {label.icon === "faTv" && <FontAwesomeIcon icon={faTv} />}
                      {label.icon === "faSolarPanel" && (
                        <FontAwesomeIcon icon={faSolarPanel} />
                      )}
                      {label.icon === "faCheck" && (
                        <FontAwesomeIcon icon={faCheck} />
                      )}
                      {label.icon === "faSpa" && (
                        <FontAwesomeIcon icon={faSpa} />
                      )}
                      {label.icon === "faBolt" && (
                        <FontAwesomeIcon icon={faBolt} />
                      )}
                      {label.icon === "faCar" && (
                        <FontAwesomeIcon icon={faCar} />
                      )}
                      {label.icon === "faBath" && (
                        <FontAwesomeIcon icon={faBath} />
                      )}
                      {label.icon === "faKitchenSet" && (
                        <FontAwesomeIcon icon={faKitchenSet} />
                      )}
                      {label.icon === "faWarehouse" && (
                        <FontAwesomeIcon icon={faWarehouse} />
                      )}
                      {label.icon === "faWind" && (
                        <FontAwesomeIcon icon={faWind} />
                      )}
                      {label.icon === "faSink" && (
                        <FontAwesomeIcon icon={faSink} />
                      )}
                      {label.icon === "faBed" && (
                        <FontAwesomeIcon icon={faBed} />
                      )}
                      {label.icon === "faExpand" && (
                        <FontAwesomeIcon icon={faExpand} />
                      )}
                      {label.icon === "faFan" && (
                        <FontAwesomeIcon icon={faFan} />
                      )}
                      {label.icon === "faSnowflake" && (
                        <FontAwesomeIcon icon={faSnowflake} />
                      )}
                      {label.icon === "faJugDetergent" && (
                        <FontAwesomeIcon icon={faJugDetergent} />
                      )}
                      {label.icon === "faBowlFood" && (
                        <FontAwesomeIcon icon={faBowlFood} />
                      )}
                      {label.icon === "faDoorOpen" && (
                        <FontAwesomeIcon icon={faDoorOpen} />
                      )}
                      {label.icon === "faWaterLadder" && (
                        <FontAwesomeIcon icon={faWaterLadder} />
                      )}
                      {label.icon === "faUtensils" && (
                        <FontAwesomeIcon icon={faUtensils} />
                      )}
                      {label.icon === "faShower" && (
                        <FontAwesomeIcon icon={faShower} />
                      )}
                      {label.icon === "faPhoneVolume" && (
                        <FontAwesomeIcon icon={faPhoneVolume} />
                      )}{" "}
                      {label.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="basis-full px-3 mb-6">
              <label className="label-form">Descrição/Info</label>
              <hr className="mb-5" />
              <Editor
                apiKey="r4q2xe40kv9pzappwn634cnqv16hgasbpze5tz7ij53kdkc3"
                value={descriptionText}
                onEditorChange={(content: string) =>
                  setDescriptionText(content)
                }
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>
          </div>
        </form>
      </div>
      <ModalCategory />
      <ModalStreet />
      <ModalDistrict />
      <ModalCity />
      <ModalTenant />
      <ModalOwner />
      <ModalPhoto
        immobleId={immobleId || ""}
        addPhotos={watch("photos") || []}
      />
    </>
  );
}
