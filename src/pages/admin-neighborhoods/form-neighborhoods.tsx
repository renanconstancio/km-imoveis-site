import { api } from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { Input } from "../../components/inputs";
import { TNeighborhoods } from "./types";
import { Helmet } from "react-helmet-async";

export default function FormNeighborhoods() {
  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { districtId } = useParams<{ districtId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TNeighborhoods>();

  const onSubmit = useCallback(async (data: TNeighborhoods) => {
    const newData = {
      ...data,
    };

    await api
      .patch(`/neighborhoods`, newData)
      .then(async resp => {
        changeAlert({
          message: "Dados salvos com sucesso.",
        }),
          navigate({
            pathname: `/adm/neighborhoods/${(await resp.data).id}/edit`,
          });
      })
      .catch(error => {
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
  }, []);

  async function loadNeighborhoods() {
    await api
      .get(`/neighborhoods/${districtId}`)
      .then(async res =>
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
    if (districtId) loadNeighborhoods();
  }, [districtId]);

  return (
    <>
      <Helmet>
        <title>
          {districtId ? "Editar" : "Cadastrar"}
          Bairros - {import.meta.env.VITE_TITLE}
        </title>
      </Helmet>
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="basis-full md:basis-4/12 px-3">
              <Input
                type="text"
                label="Bairro *"
                className={`input-form ${errors.district && "invalid"}`}
                error={errors.district}
                register={register("district", {
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
