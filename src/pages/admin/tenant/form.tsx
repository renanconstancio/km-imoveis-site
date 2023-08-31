import {
  faFolderOpen,
  faSave,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";

import {
  ModalStreet,
  ModalDistrict,
  ModalCity,
} from "../../../components/modal";
import { Input } from "../../../components/inputs";
import { SEO } from "../../../components/seo/seo";
import { useModal } from "../../../hooks/use-modal";
import { maskCPF, maskPhone } from "../../../utils/mask";
import { Neighborhood, schemaNeighborhood } from "../neighborhoods/form";
import { Street, schemaStreet } from "../streets/form";
import { City, schemaCity } from "../cities/form";
import { api } from "../../../services/api";

export const schema = {
  id: z.string().optional(),
  type: z.enum(["tenant", "tenant"]).default("tenant").optional(),
  first_name: z.string().min(1, { message: "Campo é obrigatório" }),
  last_name: z.string().min(1, { message: "Campo é obrigatório" }),
  email: z.string().optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  cnpj: z.string().optional(),
  ie: z.string().optional(),
  phone: z.string().min(1, { message: "Campo é obrigatório" }),
  cc_bank: z.string().optional(),
  ag_bank: z.string().optional(),
  pix_bank: z.string().optional(),
  rent_value: z.string().optional(),
  rental_value: z.string().optional(),
  number: z.string().optional(),

  streets_id: z.string().optional(),
  neighborhoods_id: z.string().optional(),
  cities_id: z.string().optional(),
};

export const schemaTenant = z.object({ ...schema });
export const schemaTenantCreated = z.object({
  ...schema,
  city: schemaCity.optional(),
  street: schemaStreet.optional(),
  district: schemaNeighborhood.optional(),
});

export type Tenant = z.infer<typeof schemaTenant>;
export type TenantCreated = z.infer<typeof schemaTenantCreated>;

export default function FormTenants() {
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
    openStreet,
    closeStreet,
    openNeighborhoods,
    closeNeighborhoods,
    openCity,
    closeCity,
  } = useModal();

  const navigate = useNavigate();

  const { tenantId } = useParams<{ tenantId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantCreated>({
    resolver: zodResolver(schemaTenant),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: TenantCreated) => {
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
      navigate({
        pathname: `/adm/tenants/${await resp.data?.id}/edit`,
      });
    },
  });

  useQuery({
    queryKey: ["tenants", tenantId],
    queryFn: () => {
      if (!tenantId) return null;
      return api
        .get<TenantCreated>(`/customers/${tenantId}`)
        .then(async (res) => res.data);
    },
    onSuccess: (data) => {
      if (data) {
        const newData = {
          ...data,
          streets_id: streets?.find((item) => item.id === data.streets_id)
            ?.street,
          cities_id:
            cities?.find((item) => item.id === data.cities_id) &&
            [
              cities?.find((item) => item.id === data.cities_id)?.city,
              cities?.find((item) => item.id === data.cities_id)?.state?.state,
            ].join("/"),
          neighborhoods_id: neighborhoods?.find(
            (item) => item.id === data.neighborhoods_id,
          )?.district,
        };

        reset(newData);
      }
    },
  });

  return (
    <>
      <SEO
        title={`${tenantId ? "Editar " : "Cadastrar"} Locatários`}
        siteTitle={import.meta.env.VITE_TITLE}
      />

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
          onSubmit={handleSubmit(async (data) => mutate(data))}
        >
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
            <div className="basis-full md:basis-6/12 px-3 mb-6">
              <Input
                type="text"
                label="E-mail"
                className={`input-form ${errors.email && "invalid"}`}
                error={errors.email}
                register={register("email")}
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
                type="tel"
                label="CPF "
                className={`input-form ${errors.cpf && "invalid"}`}
                error={errors.cpf}
                register={register("cpf")}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3 mb-6">
              <Input
                mask={maskPhone}
                type="text"
                label="Telefone *"
                className={`input-form ${errors.phone && "invalid"}`}
                error={errors.phone}
                register={register("phone")}
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
                {streets &&
                  streets?.map(({ id, street }) => (
                    <option key={id} value={street} />
                  ))}
              </datalist>
            </div>
            <div className="basis-full md:basis-2/12 px-3">
              <Input
                type="text"
                label="Número Casa"
                className={`input-form ${errors.number && "invalid"}`}
                error={errors.number}
                register={register("number")}
              />
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
                {neighborhoods &&
                  neighborhoods?.map(({ id, district }) => (
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
                {cities &&
                  cities?.map((city) => (
                    <option
                      key={city.id}
                      value={[city.city, city?.state?.state].join("/")}
                    />
                  ))}
              </datalist>
            </div>
            {/* <div className="basis-full font-bold uppercase font-play pt-5 px-3">
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
            </div> */}
          </div>
        </form>
      </div>
      <ModalStreet />
      <ModalDistrict />
      <ModalCity />
    </>
  );
}
