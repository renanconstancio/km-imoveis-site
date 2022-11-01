import {
  PropsCities,
  PropsCustomers,
  PropsNeighborhoods,
  PropsStreets,
} from "../../global/types/types";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAlert } from "../../hooks/use-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faSave,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../components/inputs";
import { maskPhone } from "../../utils/mask";
import { useModal } from "../../hooks/use-modal";
import { ModalCity, ModalDistrict, ModalStreet } from "../../components/modal";
import { find } from "../../utils/functions";
import { api } from "../../api/api";

export default function FormCustomers() {
  const [cities, setCities] = useState<PropsCities[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<PropsNeighborhoods[]>([]);
  const [streets, setStreets] = useState<PropsStreets[]>([]);

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

  const { ownerId } = useParams<{ ownerId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsCustomers>();

  async function onSubmit(data: PropsCustomers) {
    const rwsStreet = find(streets, data.streets_id, "street");
    const rwsDistrict = find(neighborhoods, data.neighborhoods_id, "district");
    const rwsCity = cities.find(
      item => [item.city, item.state.state].join("/") === data.cities_id,
    );

    const newPostData = {
      ...data,
      type: "owner",
      cities_id: rwsCity?.id,
      neighborhoods_id: rwsDistrict?.id,
      streets_id: rwsStreet?.id,
      rent_value: "0",
      rental_value: "0",
    };

    if (data.id)
      await api
        .put(`/customers/${ownerId}`, newPostData)
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
        .post(`/customers`, newPostData)
        .then(async resp => {
          changeAlert({
            message: "Dados salvos com sucesso.",
          });
          navigate({ pathname: `/adm/owners/${(await resp.data).id}/edit` });
        })
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro para o imovél.",
          }),
        );
  }

  async function loadCustomers() {
    await api
      .get(`/customers/${ownerId}`)
      .then(async res => {
        const customer = (await res.data) as PropsCustomers;
        reset({
          ...customer,
          cities_id: [customer.city?.city, customer.city?.state.state].join(
            "/",
          ),
          neighborhoods_id: customer?.district?.district,
          streets_id: customer.street?.street,
        });
      })
      .catch(e => {
        console.log(e);
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        });
      });
  }

  useEffect(() => {
    (async () => {
      api.get("/cities").then(async res => setCities(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api
        .get("/neighborhoods")
        .then(async res => setNeighborhoods(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api.get("/streets").then(async res => setStreets(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (ownerId) loadCustomers();
    })();
  }, [ownerId]);

  return (
    <>
      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
          <button className="btn-success btn-ico" type="submit" form="form">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </button>
          <Link className="btn-warning btn-ico" to="/adm/owners">
            <FontAwesomeIcon icon={faUndo} />
            <span>Voltar</span>
          </Link>
        </div>
        <form className="w-full" id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-5/12 px-3">
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
            <div className="w-full md:w-5/12 px-3">
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
            <div className="w-full md:w-3/12 px-3 mb-6">
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
            <div className="w-full md:w-3/12 px-3 mb-6">
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
            <div className="w-full md:w-3/12 px-3 mb-6">
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
            <div className="w-full md:w-3/12 px-3 mb-6">
              <Input
                type="text"
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
            <div className="w-full md:w-3/12 px-3 mb-6">
              <Input
                mask={maskPhone}
                type="text"
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
              <Input
                type="text"
                label="Número Casa"
                className={`input-form ${errors.number && "invalid"}`}
                error={errors.number}
                register={register("number", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
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
            <div className="w-full font-bold uppercase font-play pt-5 px-3">
              Dados da Conta Bancária <hr className="my-5" />
            </div>
            <div className="w-full md:w-2/12 px-3">
              <Input
                type="text"
                label="Agência"
                className={`input-form ${errors.ag_bank && "invalid"}`}
                error={errors.ag_bank}
                register={register("ag_bank", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="w-full md:w-4/12 px-3">
              <Input
                type="text"
                label="Conta Corrente"
                className={`input-form ${errors.cc_bank && "invalid"}`}
                error={errors.cc_bank}
                register={register("cc_bank", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="w-full md:w-4/12 px-3">
              <Input
                type="text"
                label="Chave Pix"
                className={`input-form ${errors.pix_bank && "invalid"}`}
                error={errors.pix_bank}
                register={register("pix_bank", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
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
