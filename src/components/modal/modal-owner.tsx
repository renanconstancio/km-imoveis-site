import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { maskCPF, maskPhone } from "../../utils/mask";
import { findSearch } from "../../utils/functions";
import { TStreets } from "../../pages/admin-streets/types";
import { TNeighborhoods } from "../../pages/admin-neighborhoods/types";
import { TCities } from "../../pages/admin-cities/types";
import { Input } from "../inputs";
import { TOwners } from "../../pages/admin-owners/types";

export type TModalOwner = {
  addOwner: (data: any) => void;
  streets: TStreets[];
  neighborhoods: TNeighborhoods[];
  cities: TCities[];
};

export default function ModalOwner({
  addOwner,
  cities,
  neighborhoods,
  streets,
}: TModalOwner) {
  const { openOwner, closeOwner } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOwners>();

  async function onSubmit(data: TOwners) {
    const rwsStreet = findSearch(streets, data.streets_id, "street");
    const rwsDistrict = findSearch(
      neighborhoods,
      data.neighborhoods_id,
      "district",
    );
    const rwsCity = cities.find(
      (item) => [item.city, item.state.state].join("/") === data.cities_id,
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

    await api.patch(`/customers`, newPostData).then(async (res) => {
      const customers = await res.data;
      addOwner((old: any) => [...old, customers]);
      closeOwner(!openOwner);
    });
  }

  return (
    <div className={`${openOwner ? "" : "hidden"} modal`}>
      <div className="modal-content max-w-4xl">
        <div className="modal-body">
          <button
            type="button"
            className="modal-close"
            onClick={() => closeOwner(!openOwner)}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Cadastrar Propriet??rio
            </h3>
            <form
              className="w-full"
              id="formOwner"
              onSubmit={handleSubmit(onSubmit)}
            >
              <button
                className="btn-success btn-ico mb-5"
                type="submit"
                form="formOwner"
              >
                <FontAwesomeIcon icon={faSave} />
                <span>Salvar</span>
              </button>
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
                        message: "Campo ?? obrigat??rio",
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
                        message: "Campo ?? obrigat??rio",
                      },
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="basis-full md:basis-5/12 px-3">
                  <Input
                    type="text"
                    label="E-mail "
                    className={`input-form ${errors.email && "invalid"}`}
                    error={errors.email}
                    register={register("email", {
                      required: {
                        value: false,
                        message: "Campo ?? obrigat??rio",
                      },
                    })}
                  />
                </div>
                <div className="basis-full md:basis-3/12 px-3 mb-6">
                  <Input
                    type="text"
                    label="CNPJ"
                    className={`input-form ${errors.cnpj && "invalid"}`}
                    error={errors.cnpj}
                    register={register("cnpj", {
                      required: {
                        value: false,
                        message: "Campo ?? obrigat??rio",
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
                        message: "Campo ?? obrigat??rio",
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
                        message: "Campo ?? obrigat??rio",
                      },
                    })}
                  />
                </div>
                <div className="basis-full md:basis-3/12 px-3 mb-6">
                  <Input
                    mask={maskCPF}
                    type="text"
                    label="CPF *"
                    className={`input-form ${errors.cpf && "invalid"}`}
                    error={errors.cpf}
                    register={register("cpf", {
                      required: {
                        value: true,
                        message: "Campo ?? obrigat??rio",
                      },
                    })}
                  />
                </div>
                <div className="basis-full md:basis-3/12 px-3 mb-6">
                  <Input
                    mask={maskPhone}
                    type="text"
                    label="Telefone"
                    className={`input-form ${errors.phone && "invalid"}`}
                    error={errors.phone}
                    register={register("phone", {
                      required: {
                        value: false,
                        message: "Campo ?? obrigat??rio",
                      },
                    })}
                  />
                </div>

                <div className="basis-full md:basis-6/12 px-3 mb-6">
                  <label className="label-form" htmlFor="streets_id">
                    Rua
                  </label>
                  <input
                    list="streets_id"
                    type="search"
                    className={`input-form ${errors.streets_id && "invalid"}`}
                    placeholder="Pesquisar..."
                    {...register("streets_id", { required: true })}
                  />
                  {errors.streets_id && (
                    <small className="input-text-invalid">
                      Campo obrigat??rio
                    </small>
                  )}
                  <datalist id="streets_id">
                    {streets.map(({ id, street }) => (
                      <option key={id} value={street} />
                    ))}
                  </datalist>
                </div>
                <div className="basis-full md:basis-2/12 px-3">
                  <label className="label-form" htmlFor="number">
                    N??mero Casa
                  </label>
                  <input
                    type="text"
                    className={`input-form ${errors.number && "invalid"}`}
                    {...register("number", { required: false })}
                  />
                  {errors.number && (
                    <small className="input-text-invalid">
                      Campo obrigat??rio
                    </small>
                  )}
                </div>
                <div className="basis-full md:basis-4/12 px-3 mb-6">
                  <label className="label-form" htmlFor="neighborhoods_id">
                    Bairro
                  </label>
                  <input
                    list="neighborhoods_id"
                    type="search"
                    className={`input-form ${
                      errors.neighborhoods_id && "invalid"
                    }`}
                    placeholder="Pesquisar..."
                    {...register("neighborhoods_id", { required: true })}
                  />

                  {errors.neighborhoods_id && (
                    <small className="input-text-invalid">
                      Campo obrigat??rio
                    </small>
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
                  <input
                    list="cities_id"
                    type="search"
                    className={`input-form ${errors.cities_id && "invalid"}`}
                    placeholder="Pesquisar..."
                    {...register("cities_id", { required: true })}
                  />
                  {errors.cities_id && (
                    <small className="input-text-invalid">
                      Campo obrigat??rio
                    </small>
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
                <div className="basis-full font-bold uppercase font-play pt-5 px-3">
                  Dados da Conta Banc??ria <hr className="my-5" />
                </div>
                <div className="basis-full md:basis-2/12 px-3">
                  <Input
                    type="text"
                    label="Ag??ncia"
                    className={`input-form ${errors.ag_bank && "invalid"}`}
                    error={errors.ag_bank}
                    register={register("ag_bank", {
                      required: {
                        value: false,
                        message: "Campo ?? obrigat??rio",
                      },
                    })}
                  />
                </div>
                <div className="basis-full md:basis-4/12 px-3">
                  <Input
                    type="text"
                    label="Conta Corrente"
                    className={`input-form ${errors.cc_bank && "invalid"}`}
                    error={errors.cc_bank}
                    register={register("cc_bank", {
                      required: {
                        value: false,
                        message: "Campo ?? obrigat??rio",
                      },
                    })}
                  />
                </div>
                <div className="basis-full md:basis-4/12 px-3">
                  <Input
                    type="text"
                    label="Chave Pix"
                    className={`input-form ${errors.pix_bank && "invalid"}`}
                    error={errors.pix_bank}
                    register={register("pix_bank", {
                      required: {
                        value: false,
                        message: "Campo ?? obrigat??rio",
                      },
                    })}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
