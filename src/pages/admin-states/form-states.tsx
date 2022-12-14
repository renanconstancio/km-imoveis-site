import { api } from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { Input } from "../../components/inputs";
import { TStates } from "./types";
import { Helmet } from "react-helmet-async";

export default function FormStates() {
  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { stateId } = useParams<{ stateId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStates>();

  async function onSubmit(data: TStates) {
    const newData = {
      ...data,
    };

    await api
      .patch(`/states`, newData)
      .then(async (resp) => {
        changeAlert({
          message: "Dados salvos com sucesso.",
        });
        navigate({ pathname: `/adm/states/${(await resp.data).id}/edit` });
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

  async function loadStates() {
    await api.get(`/states/${stateId}`).then(async (res) =>
      reset({
        ...(await res.data),
      }),
    );
  }

  useEffect(() => {
    if (stateId) loadStates();
  }, [stateId]);

  return (
    <>
      <Helmet>
        <title>
          {stateId ? "Editar" : "Cadastrar"}
          Estados - {import.meta.env.VITE_TITLE}
        </title>
      </Helmet>
      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
          <button className="btn-success btn-ico" type="submit" form="form">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </button>

          <Link className="btn-warning btn-ico" to="/adm/states">
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
                label="Estado. *"
                className={`input-form ${errors.state && "invalid"}`}
                error={errors.state}
                register={register("state", {
                  maxLength: 2,
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
