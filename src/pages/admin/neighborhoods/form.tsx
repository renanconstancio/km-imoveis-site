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

export const schemaNeighborhood = z.object({
  id: z.string().optional(),
  district: z.string().min(1, { message: "Campo obrigatório!" }),
});

export type Neighborhood = z.infer<typeof schemaNeighborhood>;

export default function FormNeighborhoods() {
  const navigate = useNavigate();

  const { districtId } = useParams<{ districtId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Neighborhood>({
    resolver: zodResolver(schemaNeighborhood),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Neighborhood) => {
      return await api.patch(`/neighborhoods`, { ...data });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async (resp) => {
      toast.success("Cadastro salvo com sucesso!");
      navigate({
        pathname: `/adm/neighborhoods/${await resp.data?.id}/edit`,
      });
    },
  });

  useQuery({
    queryKey: ["neighborhoods", districtId],
    queryFn: () => {
      if (!districtId) return null;
      return api
        .get<Neighborhood>(`/neighborhoods/${districtId}`)
        .then(async (res) => res.data);
    },
    onSuccess: (data) => {
      if (data) reset(data);
    },
  });

  return (
    <>
      <SEO
        title={`${districtId ? "Editar" : "Cadastrar"} Bairros`}
        siteTitle={import.meta.env.VITE_TITLE}
      />

      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
          <button className="btn-success btn-ico" type="submit" form="form">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </button>

          <Link className="btn-warning btn-ico" to="/adm/neighborhoods">
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
                className={`input-form ${errors.district && "invalid"}`}
                error={errors.district}
                register={register("district")}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
