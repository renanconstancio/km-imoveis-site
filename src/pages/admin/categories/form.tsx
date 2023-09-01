import { Link, useNavigate, useParams } from "react-router-dom";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { Input } from "../../../components/inputs";
import { SEO } from "../../../components/seo";
import { api } from "../../../services/api";

export const schemaCategory = z.object({
  id: z.string().optional(),
  category: z.string().min(1, { message: "Campo obrigatório!" }),
  filter: z.boolean().default(true).optional(),
});

export type Category = z.infer<typeof schemaCategory>;

export default function FormCategories() {
  const navigate = useNavigate();

  const { categoryId } = useParams<{ categoryId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(schemaCategory),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Category) => {
      return await api.patch(`/categories`, { ...data });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async (resp) => {
      toast.success("Cadastro salvo com sucesso!");
      navigate({
        pathname: `/adm/categories/${await resp.data?.id}/edit`,
      });
    },
  });

  useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => {
      if (!categoryId) return null;
      return api
        .get<Category>(`/categories/${categoryId}`)
        .then(async (res) => res.data);
    },
    onSuccess: (data) => {
      if (data) reset(data);
    },
  });

  return (
    <>
      <SEO
        title={`${categoryId ? "Editar " : "Cadastrar"} Categorias`}
        siteTitle={import.meta.env.VITE_TITLE}
      />

      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
          <button className="btn-success btn-ico" type="submit" form="form">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </button>

          <Link className="btn-warning btn-ico" to="/adm/categories">
            <FontAwesomeIcon icon={faUndo} />
            <span>Voltar</span>
          </Link>
        </div>
        <form
          id="form"
          className="basis-full"
          onSubmit={handleSubmit(async (data) => {
            mutate(data);
          })}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="basis-full md:basis-4/12 px-3">
              <Input
                type="text"
                label="Categorias. *"
                className={`input-form ${errors.category && "invalid"}`}
                error={errors.category}
                register={register("category")}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
