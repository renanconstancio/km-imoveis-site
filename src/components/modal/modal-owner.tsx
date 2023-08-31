import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { maskCPF, maskPhone } from "../../utils/mask";
import { Input } from "../inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { City } from "../../pages/admin/cities/form";
import { Neighborhood } from "../../pages/admin/neighborhoods/form";
import { Street } from "../../pages/admin/streets/form";
import { OwnerCreated, schemaOwner } from "../../pages/admin/owners/form";

export default function ModalOwner() {
  const { openOwner, closeOwner } = useModal();

  const { data: cities } = useQuery<City[] | []>({
    queryKey: ["cities"],
    queryFn: () => api.get(`/cities`).then(async (res) => res.data),
  });

  const { data: neighborhoods } = useQuery<Neighborhood[] | []>({
    queryKey: ["neighborhoods"],
    queryFn: () => api.get(`/neighborhoods`).then(async (res) => res.data),
  });

  const { data: streets } = useQuery<Street[] | []>({
    queryKey: ["streets"],
    queryFn: () => api.get(`/streets`).then(async (res) => res.data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OwnerCreated>({
    resolver: zodResolver(schemaOwner),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: OwnerCreated) => {
      const newData = {
        ...data,
        type: "tenant",
        streets_id: streets?.find((item) => item.street === data.streets_id)
          ?.id,
        cities_id: cities?.find(
          (item) => [item.city, item.state?.state].join("/") === data.cities_id,
        )?.id,
        neighborhoods_id: neighborhoods?.find(
          (item) => item.district === data.neighborhoods_id,
        )?.id,
      };
      console.log(newData);
      return await api.patch(`/customers`, { ...newData });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async (resp) => {
      toast.success("Cadastro salvo com sucesso!");
    },
  });

  return (
    <div className={`${openOwner ? "" : "hidden"} modal`}>
      <div className="modal-content max-w-4xl">
        <div className="modal-body rounded-lg">
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
              Cadastrar Proprietário
            </h3>
            <form
              className="w-full"
              id="formOwner"
              onSubmit={handleSubmit(async (data) => mutate(data))}
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
                    register={register("first_name")}
                  />
                </div>
                <div className="basis-full md:basis-5/12 px-3">
                  <Input
                    type="text"
                    label="Sobrenome * "
                    className={`input-form ${errors.last_name && "invalid"}`}
                    error={errors.last_name}
                    register={register("last_name")}
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
                    register={register("email")}
                  />
                </div>
                <div className="basis-full md:basis-3/12 px-3 mb-6">
                  <Input
                    type="text"
                    label="CNPJ"
                    className={`input-form ${errors.cnpj && "invalid"}`}
                    error={errors.cnpj}
                    register={register("cnpj")}
                  />
                </div>
                <div className="basis-full md:basis-3/12 px-3 mb-6">
                  <Input
                    type="text"
                    label="IE "
                    className={`input-form ${errors.ie && "invalid"}`}
                    error={errors.ie}
                    register={register("ie")}
                  />
                </div>
                <div className="basis-full md:basis-3/12 px-3 mb-6">
                  <Input
                    type="text"
                    label="RG "
                    className={`input-form ${errors.rg && "invalid"}`}
                    error={errors.rg}
                    register={register("rg")}
                  />
                </div>
                <div className="basis-full md:basis-3/12 px-3 mb-6">
                  <Input
                    mask={maskCPF}
                    type="text"
                    label="CPF *"
                    className={`input-form ${errors.cpf && "invalid"}`}
                    error={errors.cpf}
                    register={register("cpf")}
                  />
                </div>
                <div className="basis-full md:basis-3/12 px-3 mb-6">
                  <Input
                    mask={maskPhone}
                    type="text"
                    label="Telefone"
                    className={`input-form ${errors.phone && "invalid"}`}
                    error={errors.phone}
                    register={register("phone")}
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
                    {...register("streets_id")}
                  />
                  {errors.streets_id && (
                    <small className="input-text-invalid">
                      Campo obrigatório
                    </small>
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
                    <small className="input-text-invalid">
                      Campo obrigatório
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
                    {...register("neighborhoods_id")}
                  />

                  {errors.neighborhoods_id && (
                    <small className="input-text-invalid">
                      Campo obrigatório
                    </small>
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
                  <input
                    list="cities_id"
                    type="search"
                    className={`input-form ${errors.cities_id && "invalid"}`}
                    placeholder="Pesquisar..."
                    {...register("cities_id")}
                  />
                  {errors.cities_id && (
                    <small className="input-text-invalid">
                      Campo obrigatório
                    </small>
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
                <div className="basis-full font-bold uppercase font-play pt-5 px-3">
                  Dados da Conta Bancária <hr className="my-5" />
                </div>
                <div className="basis-full md:basis-2/12 px-3">
                  <Input
                    type="text"
                    label="Agência"
                    className={`input-form ${errors.ag_bank && "invalid"}`}
                    error={errors.ag_bank}
                    register={register("ag_bank")}
                  />
                </div>
                <div className="basis-full md:basis-4/12 px-3">
                  <Input
                    type="text"
                    label="Conta Corrente"
                    className={`input-form ${errors.cc_bank && "invalid"}`}
                    error={errors.cc_bank}
                    register={register("cc_bank")}
                  />
                </div>
                <div className="basis-full md:basis-4/12 px-3">
                  <Input
                    type="text"
                    label="Chave Pix"
                    className={`input-form ${errors.pix_bank && "invalid"}`}
                    error={errors.pix_bank}
                    register={register("pix_bank")}
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
