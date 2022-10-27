import {
  PropsCategories,
  PropsCities,
  PropsImmobles,
  PropsNeighborhoods,
  PropsStreets,
} from "../../global/types/types";
import {
  ModalCategory,
  ModalStreet,
  ModalDistrict,
  ModalCity,
} from "../../components/modal";
import { api } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";

export default function FormStreets() {
  const [streets, setStreets] = useState<PropsStreets>({} as PropsStreets);

  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { streetId } = useParams<{ streetId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsStreets>();

  async function onSubmit(data: PropsStreets) {
    const newPostData = {
      ...data,
    };

    if (data.id)
      await api
        .put(`/streets/${streetId}`, newPostData)
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
        .post(`/streets`, newPostData)
        .then(async resp => {
          navigate({ pathname: `/adm/streets/${(await resp.data).id}/edit` });
        })
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro para o imovél.",
          }),
        );
  }

  useEffect(() => {
    (async () => {
      if (!streetId) return;

      api
        .get(`/streets/${streetId}`)
        .then(async res => {
          const resp = (await res.data) as PropsStreets;
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
  }, [streetId, reset]);

  return (
    <>
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
        <form className="w-full" id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-4/12 px-3">
              <label className="label-form" htmlFor="street">
                RUA.
              </label>
              <input
                type="text"
                className={`input-form ${errors.street && "invalid"}`}
                {...register("street", { required: true })}
              />
              {errors.street && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
            </div>
            <div className="w-full md:w-2/12 px-3">
              <label className="label-form" htmlFor="zip_code">
                CEP.
              </label>
              <input
                type="text"
                className={`input-form ${errors.zip_code && "invalid"}`}
                {...register("zip_code", { required: false })}
              />
              {errors.zip_code && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
