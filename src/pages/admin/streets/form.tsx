import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";

import { Input } from "../../../components/inputs";
import { SEO } from "../../../components/seo";
import { api } from "../../../services/api";
import { maskCep } from "../../../utils/mask";

export const schemaStreet = z.object({
  id: z.string().optional(),
  street: z.string().min(1, { message: "Campo obrigatório!" }),
  zip_code: z.string().optional(),
});

export type Street = z.infer<typeof schemaStreet>;

export default function FormStreets() {
  const navigate = useNavigate();

  const { streetId } = useParams<{ streetId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Street>({
    resolver: zodResolver(schemaStreet),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Street) => {
      return await api.patch(`/streets`, { ...data });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async (resp) => {
      toast.success("Cadastro salvo com sucesso!");
      navigate({
        pathname: `/adm/streets/${await resp.data?.id}/edit`,
      });
    },
  });

  useQuery({
    queryKey: ["street", streetId],
    queryFn: () => {
      if (!streetId) return null;
      return api
        .get<Street>(`/streets/${streetId}`)
        .then(async (res) => res.data);
    },
    onSuccess: (data) => {
      if (data) reset(data);
    },
  });

  return (
    <>
      <SEO
        title={`${streetId ? "Editar" : "Cadastrar"} Ruas`}
        siteTitle={import.meta.env.VITE_TITLE}
      />

      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
          <button className="btn-success btn-ico" type="submit" form="form">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </button>

          <Link className="btn-warning btn-ico" to="/adm/streets">
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
            <div className="basis-full md:basis-4/12 px-3">
              <Input
                type="text"
                label="Rua, Avenida, Apto. *"
                className={`input-form ${errors.street && "invalid"}`}
                error={errors.street}
                register={register("street")}
              />
            </div>
            <div className="basis-full mb-6"></div>
            <div className="basis-full md:basis-2/12 px-3">
              <Input
                mask={maskCep}
                type="text"
                label="CEP *"
                className={`input-form ${errors.zip_code && "invalid"}`}
                error={errors.zip_code}
                register={register("zip_code")}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
