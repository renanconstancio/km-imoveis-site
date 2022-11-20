import { api } from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useAlert } from "../../hooks/use-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faSave,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../components/inputs";
import { maskCPF, maskPhone } from "../../utils/mask";
import { useModal } from "../../hooks/use-modal";
import { ModalCity, ModalDistrict, ModalStreet } from "../../components/modal";
import { findSearch } from "../../utils/functions";
import { TCities } from "../admin-cities/types";
import { TNeighborhoods } from "../admin-neighborhoods/types";
import { TStreets } from "../admin-streets/types";
import { TTenant } from "./types";

export default function FormCustomers() {
  const [cities, setCities] = useState<TCities[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<TNeighborhoods[]>([]);
  const [streets, setStreets] = useState<TStreets[]>([]);

  const {
    openStreet,
    closeStreet,
    openNeighborhoods,
    closeNeighborhoods,
    openCity,
    closeCity,
  } = useModal();

  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { tenantId } = useParams<{ tenantId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTenant>();

  async function onSubmit(data: TTenant) {
    const rwsStreet = findSearch(streets, data.streets_id, "street");
    const rwsDistrict = findSearch(
      neighborhoods,
      data.neighborhoods_id,
      "district",
    );
    const rwsCity = cities.find(
      item => [item.city, item.state.state].join("/") === data.cities_id,
    );

    const newData = {
      ...data,
      type: "tenant",
      cities_id: rwsCity?.id,
      neighborhoods_id: rwsDistrict?.id,
      streets_id: rwsStreet?.id,
      cc_bank: "",
      ag_bank: "",
      pix_bank: "",
      rent_value: "0",
      rental_value: "0",
      email: "",
    };

    await api
      .patch(`/customers`, newData)
      .then(async resp => {
        changeAlert({
          message: "Dados salvos com sucesso.",
        });
        navigate({ pathname: `/adm/tenants/${(await resp.data).id}/edit` });
      })
      .catch(error => {
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

  async function loadCustomers() {
    await api
      .get(`/customers/${tenantId}`)
      .then(async res => {
        const customer: TTenant = await res.data;
        reset({
          ...customer,
          neighborhoods_id: customer?.district?.district,
          streets_id: customer.street?.street,
          cities_id:
            customer.city?.city && customer.city?.state.state
              ? [customer.city?.city, customer.city?.state.state].join("/")
              : "",
        });
      })
      .catch(() => {
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        });
      });
  }

  useEffect(() => {
    (async () =>
      await api.get("/cities").then(async res => setCities(await res.data)))();
  }, []);

  useEffect(() => {
    (async () =>
      await api
        .get("/neighborhoods")
        .then(async res => setNeighborhoods(await res.data)))();
  }, []);

  useEffect(() => {
    (async () =>
      await api
        .get("/streets")
        .then(async res => setStreets(await res.data)))();
  }, []);

  useEffect(() => {
    if (tenantId) loadCustomers();
  }, [tenantId]);

  return (
    <>
      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
          <button className="btn-success btn-ico" type="submit" form="form">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </button>
          <Link className="btn-warning btn-ico" to="/adm/tenants">
            <FontAwesomeIcon icon={faUndo} />
            <span>Voltar</span>
          </Link>
        </div>
        <form
          id="form"
          className="basis-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="basis-full md:basis-5/12 px-3">
              <Input
                type="text"
                label="Nome. *"
                className={`input-form ${errors.first_name && "invalid"}`}
                error={errors.first_name}
                register={register("first_name", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-5/12 px-3">
              <Input
                type="text"
                label="Sobrenome * "
                className={`input-form ${errors.last_name && "invalid"}`}
                error={errors.last_name}
                register={register("last_name", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="basis-full md:basis-6/12 px-3 mb-6">
              <Input
                type="text"
                label="E-mail"
                className={`input-form ${errors.email && "invalid"}`}
                error={errors.email}
                register={register("email", {
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
                label="CNPJ"
                className={`input-form ${errors.cnpj && "invalid"}`}
                error={errors.cnpj}
                register={register("cnpj", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3 mb-6">
              <Input
                type="text"
                label="IE "
                className={`input-form ${errors.ie && "invalid"}`}
                error={errors.ie}
                register={register("ie", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3 mb-6">
              <Input
                type="text"
                label="RG "
                className={`input-form ${errors.rg && "invalid"}`}
                error={errors.rg}
                register={register("rg", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3 mb-6">
              <Input
                mask={maskCPF}
                type="tel"
                label="CPF *"
                className={`input-form ${errors.cpf && "invalid"}`}
                error={errors.cpf}
                register={register("cpf", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3 mb-6">
              <Input
                mask={maskPhone}
                type="tel"
                label="Telefone"
                className={`input-form ${errors.phone && "invalid"}`}
                error={errors.phone}
                register={register("phone", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>

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
      <ModalStreet addStreets={setStreets} />
      <ModalDistrict addDistricts={setNeighborhoods} />
      <ModalCity addCities={setCities} />
    </>
  );
}
