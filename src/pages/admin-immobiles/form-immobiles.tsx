import { api, tags } from "../../services/api";
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
import {
  ModalCategory,
  ModalStreet,
  ModalDistrict,
  ModalCity,
} from "../../components/modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "../../hooks/use-alert";
import { useModal } from "../../hooks/use-modal";
import { findSearch } from "../../utils/functions";
import { maskCurrency, maskCurrencyUs } from "../../utils/mask";
import { Editor } from "@tinymce/tinymce-react";
import { OptionSituation } from "../../components/option-situation";
import { TCategories } from "../admin-categories/types";
import { TCities } from "../admin-cities/types";
import { Input } from "../../components/inputs";

import ModalPhoto from "../../components/modal/modal-photos";
import ModalTenant from "../../components/modal/modal-tenant";
import ModalOwner from "../../components/modal/modal-owner";

import { TNeighborhoods } from "../admin-neighborhoods/types";
import { TStreets } from "../admin-streets/types";
import { TTenant } from "../admin-tenant/types";
import { TOwners } from "../admin-owners/types";
import { TUsers } from "../admin-users/types";
import { TImmobles } from "./types";
import { Helmet } from "react-helmet-async";

export default function FormImmobles() {
  const [cities, setCities] = useState<TCities[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<TNeighborhoods[]>([]);
  const [streets, setStreets] = useState<TStreets[]>([]);
  const [categories, setCategories] = useState<TCategories[]>([]);
  const [tenants, setTenant] = useState<TTenant[]>([]);
  const [owners, setOwner] = useState<TOwners[]>([]);
  const [users, setUsers] = useState<TUsers[]>([]);
  const [tagsSite, setTagsSite] = useState<string[]>([]);
  const [onOff, setOnOff] = useState<boolean>(false);
  const [descriptionText, setDescriptionText] = useState<string>("");

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
  const { changeAlert } = useAlert();

  const { immobleId } = useParams<{ immobleId: string | undefined }>();

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TImmobles>();

  async function onSubmit(data: TImmobles) {
    const rwsUser = users.find(
      (item) => [item.first_name].join(" ") === data.users_id,
    );
    const rwsOwner = owners.find(
      (item) => [item.first_name, item.last_name].join(" ") === data.owner_id,
    );
    const rwsTenant = tenants.find(
      (item) => [item.first_name, item.last_name].join(" ") === data.tenant_id,
    );
    const rwsCity = cities.find(
      (item) => [item.city, item.state.state].join("/") === data.cities_id,
    );
    const rwsStreet = findSearch(streets, data.streets_id, "street");
    const rwsDistrict = findSearch(
      neighborhoods,
      data.neighborhoods_id,
      "district",
    );
    const rwsCategory = findSearch(categories, data.categories_id, "category");
    const existsTags = (tagsSite.length ? tagsSite : []).join(",");

    const newData = {
      ...data,
      sale_price: maskCurrencyUs(`${data.sale_price || 0}`),
      rent_price: maskCurrencyUs(`${data.rent_price || 0}`),
      tags: existsTags,
      published: onOff,
      description_text: descriptionText,
      cities_id: rwsCity?.id ?? null,
      categories_id: rwsCategory?.id ?? null,
      neighborhoods_id: rwsDistrict?.id ?? null,
      streets_id: rwsStreet?.id ?? null,
      tenant_id: rwsTenant?.id ?? null,
      owner_id: rwsOwner?.id ?? null,
      users_id: rwsUser?.id ?? null,
    };

    await api
      .patch(`/immobiles`, newData)
      .then(async (resp) => {
        changeAlert({
          message: "Dados salvos com sucesso.",
        });
        navigate({ pathname: `/adm/immobiles/${(await resp.data).id}/edit` });
      })
      .catch((error) => {
        changeAlert({
          title: "Atenção",
          message: "Não foi possivel fazer o cadastro!",
          variant: "danger",
        });

        if (error.response.status === 422)
          changeAlert({
            title: "Atenção",
            variant: "danger",
            message: `${error.response.data.message}`,
          });
      });
  }

  async function loadImmoble() {
    await api
      .get(`/immobiles/${immobleId}`)
      .then(async (res) => {
        const immoble: TImmobles = await res.data;

        reset({
          ...immoble,
          sale_price: `${maskCurrency(immoble.sale_price)}`,
          rent_price: `${maskCurrency(immoble.rent_price)}`,
          users_id: immoble.user?.first_name,
          categories_id: immoble.category?.category,
          neighborhoods_id: immoble?.district?.district,
          streets_id: immoble.street?.street,
          cities_id:
            immoble.city?.city && immoble.city?.state?.state
              ? [immoble.city?.city, immoble.city?.state?.state].join("/")
              : "",
          owner_id:
            immoble.owner?.first_name && immoble.owner?.last_name
              ? [immoble.owner?.first_name, immoble.owner?.last_name]
                  .join(" ")
                  .trim()
              : "",
          tenant_id:
            immoble.tenant?.first_name && immoble.tenant?.last_name
              ? [immoble.tenant?.first_name, immoble.tenant?.last_name]
                  .join(" ")
                  .trim()
              : "",
        });

        setTagsSite(immoble?.tags?.split(",") || "");
        setDescriptionText(immoble?.description_text);
        setOnOff(immoble?.published);
      })
      .catch((e) => {
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        });
      });
  }

  async function loadCategories() {
    await api
      .get("/categories")
      .then(async (res) => setCategories(await res.data));
  }

  async function loadCities() {
    await api.get("/cities").then(async (res) => setCities(await res.data));
  }

  async function loadNeighborhoods() {
    await api
      .get("/neighborhoods")
      .then(async (res) => setNeighborhoods(await res.data));
  }

  async function loadStreets() {
    await api.get("/streets").then(async (res) => setStreets(await res.data));
  }

  async function loadTenants() {
    await api
      .get("/customers?limit=10000&search[type]=tenant")
      .then(async (res) => setTenant(await res.data?.data));
  }

  async function loadOwners() {
    await api
      .get("/customers?limit=10000&search[type]=owner")
      .then(async (res) => setOwner(await res.data?.data));
  }

  async function loadUsers() {
    await api.get("/users").then(async (res) => setUsers(await res.data));
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    loadNeighborhoods();
  }, []);

  useEffect(() => {
    loadStreets();
  }, []);

  useEffect(() => {
    loadTenants();
  }, []);

  useEffect(() => {
    loadOwners();
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (immobleId) loadImmoble();
  }, [immobleId]);

  return (
    <>
      <Helmet>
        <title>
          {immobleId ? "Editar " : "Cadastrar"}
          Imóveis - {import.meta.env.VITE_TITLE}
        </title>
      </Helmet>
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
            <Link className="btn-warning btn-ico" to="/adm/immobiles">
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3">
            <div className="basis-full md:basis-2/12 px-3">
              <Input
                type="text"
                label="CÓD. *"
                className={`input-form ${errors.reference && "invalid"}`}
                error={errors.reference}
                register={register("reference", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-6/12 px-3">
              <Input
                type="text"
                label="Descrição do Imóvel * "
                className={`input-form ${errors.description && "invalid"}`}
                error={errors.description}
                register={register("description", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3">
              <label className="label-form" htmlFor="situation">
                Situação
              </label>
              <div className="relative">
                <select
                  className="input-form"
                  {...register("situation", { required: false })}
                >
                  <OptionSituation />
                </select>
              </div>
            </div>
            {/* <div className="basis-full md:basis-2/12 px-3">
              <label className="label-form" htmlFor="published">
                Web
              </label>
              <div className="relative">
                <select
                  className="input-form"
                  {...register("published", { required: false })}
                >
                  <option value={"false"}>OFFLINE</option>
                  <option value={"true"}>ONLINE</option>
                </select>
              </div>
            </div> */}
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
                    {...register("users_id", { required: false })}
                  />
                </span>
              </div>
              {errors.users_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="users_id">
                {users.map(({ id, first_name }) => (
                  <option key={id} value={[first_name].join(", ")} />
                ))}
              </datalist>
            </div>
            <div className="basis-full md:basis-4/12 px-3">
              <Input
                type="text"
                label="Captador/Outros"
                className={`input-form ${errors.pickup && "invalid"}`}
                error={errors.pickup}
                register={register("pickup", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
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
                register={register("building_area", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3  mb-6">
              <Input
                type="text"
                label="Área Terrea (m²)"
                className={`input-form ${errors.terrain_area && "invalid"}`}
                error={errors.terrain_area}
                register={register("terrain_area", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-2/12 px-3  mb-6">
              <Input
                type="tel"
                mask={maskCurrency}
                label="Pr.Venda."
                className={`input-form ${errors.sale_price && "invalid"}`}
                error={errors.sale_price}
                register={register("sale_price", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-2/12 px-3  mb-6">
              <Input
                type="tel"
                mask={maskCurrency}
                label="Pr.Aluguel."
                className={`input-form ${errors.rent_price && "invalid"}`}
                error={errors.rent_price}
                register={register("rent_price", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
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
                    {...register("categories_id", { required: true })}
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
                {categories.map(({ id, category }) => (
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
                    {...register("streets_id", { required: false })}
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
                {streets.map(({ id, street }) => (
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
                {...register("number", { required: false })}
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
                    {...register("neighborhoods_id", { required: false })}
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
                {neighborhoods.map(({ id, district }) => (
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
                    {...register("cities_id", { required: false })}
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
                {cities.map((city) => (
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
                    {...register("tenant_id", { required: false })}
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
                {tenants.map(({ id, first_name, last_name }) => (
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
                    {...register("owner_id", { required: false })}
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
                {owners.map(({ id, first_name, last_name }) => (
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
                      className={`p-3 block m-1 ${
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
              {/* <textarea
                cols={30}
                rows={17}
                className={`input-form`}
                placeholder="Pesquisar..."
                onChange={e => setDescriptionText(e.target.value)}
              >
                {descriptionText}
              </textarea> */}
            </div>
          </div>
        </form>
      </div>
      <ModalTenant
        addTenant={setTenant}
        streets={streets}
        neighborhoods={neighborhoods}
        cities={cities}
      />
      <ModalOwner
        addOwner={setOwner}
        streets={streets}
        neighborhoods={neighborhoods}
        cities={cities}
      />
      <ModalCategory addCategories={setCategories} />
      <ModalStreet addStreets={setStreets} />
      <ModalDistrict addDistricts={setNeighborhoods} />
      <ModalCity addCities={setCities} />
      <ModalPhoto
        immobleId={immobleId || ""}
        addPhotos={watch("photos") || []}
      />
    </>
  );
}
