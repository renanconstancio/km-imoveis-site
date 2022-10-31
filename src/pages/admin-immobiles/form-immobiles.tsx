import {
  PropsCategories,
  PropsCities,
  PropsImmobles,
  PropsNeighborhoods,
  PropsStreets,
} from "../../global/types/types";
import {
  ModalCategory,
  ModalStreet,
  ModalDistrict,
  ModalCity,
} from "../../components/modal";
import { api } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAlert } from "../../hooks/use-alert";
import { useModal } from "../../hooks/use-modal";
import { find } from "../../utils/functions";
import ModalPhoto from "../../components/modal/modal-photos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faImage,
  faSave,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../components/inputs";
import { maskCurrency, maskCurrencyUs } from "../../utils/mask";

const tags = [
  "banheiro",
  "2 banheiro",
  "3 banheiro",
  "quarto",
  "2 quarto",
  "3 quarto",
  "4 quarto",
  "sala",
  "copa",
  "cozinha",
  "sala de star",
  "1 suite",
  "ventilador",
  "ar condicionado",
  "caragem",
  "caragem 2 carros",
  "caragem 3 carros",
  "caragem 4 carros",
];

export default function FormImmobles() {
  const [cities, setCities] = useState<PropsCities[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<PropsNeighborhoods[]>([]);
  const [streets, setStreets] = useState<PropsStreets[]>([]);
  const [categories, setCategories] = useState<PropsCategories[]>([]);

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
  } = useModal();

  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { immobleId } = useParams<{ immobleId: string | undefined }>();

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsImmobles>();

  async function onSubmit(data: PropsImmobles) {
    const rwsCity = cities.find(
      item => [item.city, item.state.state].join("/") === data.cities_id,
    );
    const rwsStreet = find(streets, data.streets_id, "street");
    const rwsDistrict = find(neighborhoods, data.neighborhoods_id, "district");
    const rwsCategory = find(categories, data.categories_id, "category");

    const newPostData = {
      ...data,
      published: data.published === "true" ? true : false,
      sale_price: maskCurrencyUs(`${data.sale_price || 0}`),
      rent_price: maskCurrencyUs(`${data.rent_price || 0}`),
      cities_id: rwsCity?.id,
      categories_id: rwsCategory?.id,
      neighborhoods_id: rwsDistrict?.id,
      streets_id: rwsStreet?.id,
    };

    if (data.id)
      await api
        .put(`/immobiles/${immobleId}`, newPostData)
        .then(() =>
          changeAlert({
            message: "Dados salvos com sucesso.",
          }),
        )
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro para o imovél.",
          }),
        );
    else
      await api
        .post(`/immobiles`, newPostData)
        .then(async resp => {
          changeAlert({
            message: "Dados salvos com sucesso.",
          });
          navigate({ pathname: `/adm/immobiles/${(await resp.data).id}/edit` });
        })
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro para o imovél.",
          }),
        );
  }

  useEffect(() => {
    (async () => {
      api.get("/categories").then(async res => setCategories(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api.get("/cities").then(async res => setCities(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api.get("/districts").then(async res => setNeighborhoods(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api.get("/streets").then(async res => setStreets(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!immobleId) return;

      api
        .get(`/immobiles/${immobleId}`)
        .then(async res => {
          const immoble = (await res.data) as PropsImmobles;
          reset({
            ...immoble,
            sale_price: `${maskCurrency(immoble.sale_price)}`,
            rent_price: `${maskCurrency(immoble.rent_price)}`,
            cities_id: [immoble.city?.city, immoble.city?.state.state].join(
              "/",
            ),
            categories_id: immoble.category?.category,
            neighborhoods_id: immoble?.district?.district,
            streets_id: immoble.street?.street,
          });
        })
        .catch(e => {
          console.log(e);
          changeAlert({
            message: "Não foi possivel conectar ao servidor.",
          });
        });
    })();
  }, [changeAlert, immobleId, reset]);

  console.log(maskCurrency("120000"));
  return (
    <>
      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
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
        </div>
        <form className="w-full" id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-2/12 px-3">
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
            <div className="w-full md:w-6/12 px-3">
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
            <div className="w-full md:w-4/12 px-3">
              <Input
                type="text"
                label="Captador"
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
            <div className="w-full md:w-3/12 px-3">
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
            <div className="w-full md:w-3/12 px-3">
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
            <div className="w-full md:w-2/12 px-3">
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

            <div className="w-full md:w-2/12 px-3">
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
            <div className="w-full md:w-2/12 px-3 mb-6">
              <label className="label-form" htmlFor="situation">
                Situação
              </label>
              <div className="relative">
                <select
                  className="input-form"
                  {...register("situation", { required: false })}
                >
                  <option value="location">Locação</option>
                  <option value="purchase">Compra</option>
                  <option value="sale">Venda</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-2/12 px-3 mb-6">
              <label className="label-form" htmlFor="published">
                Web
              </label>
              <div className="relative">
                <select
                  className="input-form"
                  defaultValue={"false"}
                  {...register("published", { required: false })}
                >
                  <option value={"true"}>Publicar</option>
                  <option value={"false"}>Congelar</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-3 mb-6">
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
            <div className="w-full md:w-6/12 px-3 mb-6">
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
                    {...register("streets_id", { required: true })}
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
            <div className="w-full md:w-2/12 px-3">
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

            <div className="w-full md:w-4/12 px-3 mb-6">
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
                    {...register("neighborhoods_id", { required: true })}
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
            <div className="w-full md:w-4/12 px-3 mb-6">
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
                    {...register("cities_id", { required: true })}
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
                {cities.map(city => (
                  <option
                    key={city.id}
                    value={[city.city, city?.state?.state].join("/")}
                  />
                ))}
              </datalist>
            </div>
          </div>
        </form>
      </div>
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
