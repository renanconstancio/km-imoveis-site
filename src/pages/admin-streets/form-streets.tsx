import { api } from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { Input } from "../../components/inputs";
import { maskCep } from "../../utils/mask";
import { TStreets } from "./types";
import { Helmet } from "react-helmet-async";

export default function FormStreets() {
  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { streetId } = useParams<{ streetId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStreets>();

  async function onSubmit(data: TStreets) {
    const newData = {
      ...data,
    };

    await api
      .patch(`/streets`, newData)
      .then(async (resp) => {
        changeAlert({
          message: "Dados salvos com sucesso.",
        });
        navigate({ pathname: `/adm/streets/${(await resp.data).id}/edit` });
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

  async function loadStreets() {
    await api
      .get(`/streets/${streetId}`)
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
    if (streetId) loadStreets();
  }, [streetId]);

  return (
    <>
      <Helmet>
        <title>
          {streetId ? "Editar" : "Cadastrar"}
          Ruas - {import.meta.env.VITE_TITLE}
        </title>
      </Helmet>
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="basis-full md:basis-4/12 px-3">
              <Input
                type="text"
                label="Rua, Avenida, Apto. *"
                className={`input-form ${errors.street && "invalid"}`}
                error={errors.street}
                register={register("street", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório",
                  },
                })}
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
                register={register("zip_code", {
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
    </>
  );
}
