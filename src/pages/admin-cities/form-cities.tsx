import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { findSearch } from "../../utils/functions";
import { PropsCities } from "./types";
import { api } from "../../services/api";

export default function FormCities() {
  const [states, setSates] = useState([]);

  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { streetId } = useParams<{ streetId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsCities>();

  const onSubmit = useCallback(async (data: PropsCities) => {
    const rwsState = findSearch(states, data.states_id, "state");
    const newPostData = {
      ...data,
      states_id: rwsState?.id,
    };

    if (streetId) {
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
      return;
    }

    await api
      .post(`/cities`, newPostData)
      .then(async resp => {
        changeAlert({
          message: "Dados salvos com sucesso.",
        });
        navigate({ pathname: `/adm/cities/${(await resp.data).id}/edit` });
      })
      .catch(() =>
        changeAlert({
          message: "Não foi possivel fazer um novo cadastro para o imovél.",
        }),
      );
  }, []);

  const loadStates = useCallback(async () => {
    await api.get("/states").then(async res => setSates(await res.data));
  }, []);

  useEffect(() => {
    loadStates();
  }, []);

  const loadCities = useCallback(async () => {
    api
      .get(`/cities/${streetId}`)
      .then(async res => {
        const resp = await res.data;
        reset({
          ...resp,
          states_id: resp.state?.state,
        });
      })
      .catch(() =>
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        }),
      );
  }, []);

  useEffect(() => {
    if (streetId) loadCities();
  }, [streetId]);

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
        <form
          id="form"
          className="basis-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="basis-full md:basis-4/12 px-3">
              <label className="label-form" htmlFor="street">
                Cidade *
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
            <div className="basis-full mb-5"></div>
            <div className="basis-full md:basis-2/12 px-3 mb-5">
              <label className="label-form" htmlFor="situation">
                Estado *
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
