import { PropsStates } from "../../global/types/types";

import { api } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { Input } from "../../components/inputs";

export default function FormStates() {
  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { stateId } = useParams<{ stateId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsStates>();

  async function onSubmit(data: PropsStates) {
    const newPostData = {
      ...data,
    };

    if (data.id)
      await api
        .put(`/states/${stateId}`, newPostData)
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
        .post(`/states`, newPostData)
        .then(async resp => {
          navigate({ pathname: `/adm/states/${(await resp.data).id}/edit` });
        })
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro.",
          }),
        );
  }

  useEffect(() => {
    (async () => {
      if (!stateId) return;

      api
        .get(`/states/${stateId}`)
        .then(async res => {
          const resp = (await res.data) as PropsStates;
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
  }, [stateId, reset, changeAlert]);

  return (
    <>
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
        <form className="w-full" id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-4/12 px-3">
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
