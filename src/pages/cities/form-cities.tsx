import { PropsCities } from "../../global/types/types";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";

export default function FormCities() {
  const [states, setSates] = useState([]);

  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { streetId } = useParams<{ streetId: string | undefined }>();

  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsCities>();

  async function onSubmit(data: PropsCities) {
    const newPostData = {
      ...data,
      states_id: states.find(
        (e: { state: string }) => e.state === data.state.state,
      ),
    };

    if (data.id)
      await api
        .put(`/cities/${streetId}`, newPostData)
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
        .post(`/cities`, newPostData)
        .then(async resp => {
          navigate({ pathname: `/adm/cities/${(await resp.data).id}/edit` });
        })
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro para o imovél.",
          }),
        );
  }

  useEffect(() => {
    (async () => {
      api.get("/states").then(async res => setSates(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!streetId) return;

      api
        .get(`/cities/${streetId}`)
        .then(async res => {
          const resp: PropsCities = (await res.data) as PropsCities;
          reset({
            ...resp,
            states_id: resp.state.state,
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

          <Link className="btn-warning btn-ico" to="/adm/cities">
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
                className={`input-form ${errors.city && "invalid"}`}
                {...register("city", { required: true })}
              />
              {errors.city && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
            </div>
            <div className="w-full md:w-2/12 px-3 mb-5">
              <label className="label-form" htmlFor="situation">
                Estado
              </label>
              <div className="flex">
                <input
                  list="states"
                  type="search"
                  placeholder="Pesquisar..."
                  className={`input-form ${errors.states_id && "invalid"}`}
                  {...register("states_id", { required: true })}
                />
              </div>
              {errors.states_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="states">
                {states.map(({ id, state }) => (
                  <option key={id} value={state} />
                ))}
              </datalist>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
