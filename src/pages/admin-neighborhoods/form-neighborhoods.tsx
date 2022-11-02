import { PropsNeighborhoods } from "../../global/types/types";

import { api } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { Input } from "../../components/inputs";

export default function FormNeighborhoods() {
  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { districtId } = useParams<{ districtId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsNeighborhoods>();

  async function onSubmit(data: PropsNeighborhoods) {
    const newPostData = {
      ...data,
    };

    if (data.id)
      await api
        .put(`/neighborhoods/${districtId}`, newPostData)
        .then(() =>
          changeAlert({
            message: "Dados salvos com sucesso.",
          }),
        )
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro para o imovél.",
          }),
        );
    else
      await api
        .post(`/neighborhoods`, newPostData)
        .then(async resp => {
          changeAlert({
            message: "Dados salvos com sucesso.",
          }),
            navigate({
              pathname: `/adm/neighborhoods/${(await resp.data).id}/edit`,
            });
        })
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro.",
          }),
        );
  }

  useEffect(() => {
    (async () => {
      if (!districtId) return;

      api
        .get(`/neighborhoods/${districtId}`)
        .then(async res => {
          const resp = (await res.data) as PropsNeighborhoods;
          reset({
            ...resp,
          });
        })
        .catch(() =>
          changeAlert({
            message: "Não foi possivel conectar ao servidor.",
          }),
        );
    })();
  }, [districtId, reset, changeAlert]);

  return (
    <>
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
        <form className="w-full" id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-4/12 px-3">
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