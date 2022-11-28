import { api } from "../../services/api";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TCategories } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { Input } from "../../components/inputs";
import { SEO } from "../../components/seo/seo";

export default function FormCategories() {
  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { categoryId } = useParams<{ categoryId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategories>();

  async function onSubmit(data: TCategories) {
    const newData = {
      ...data,
    };

    await api
      .patch(`/categories`, newData)
      .then(async (resp) => {
        changeAlert({
          message: "Cadastro salvo com sucesso!",
        });
        navigate({
          pathname: `/adm/categories/${await resp.data?.id}/edit`,
        });
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

  async function loadCategories() {
    await api
      .get(`/categories/${categoryId}`)
      .then(async (res) =>
        reset({
          ...(await res.data),
        }),
      )
      .catch(() =>
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        }),
      );
  }

  useEffect(() => {
    if (categoryId) loadCategories();
  }, [categoryId]);

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
          className="basis-full"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="basis-full md:basis-4/12 px-3">
              <Input
                type="text"
                label="Categorias. *"
                className={`input-form ${errors.category && "invalid"}`}
                error={errors.category}
                register={register("category", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
