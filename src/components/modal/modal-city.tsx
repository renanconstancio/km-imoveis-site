import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useModal } from "../../hooks/use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TCities } from "../../pages/admin-cities/types";

export type TModalCity = {
  addCities: (data: any) => void;
};

export default function ModalCity({ addCities }: TModalCity) {
  const [states, setSates] = useState([]);
  const [statesId, setSatesId] = useState();
  const { openCity, closeCity } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCities>();

  const handleChangeList = (event: any) => {
    const { id }: any = states.find(
      (e: { state: string }) => e.state === event.target.value,
    );

    setSatesId(id);
  };

  async function onSubmit(data: TCities) {
    await api
      .patch(`/cities`, { city: data.city, states_id: statesId })
      .then(async (res) => {
        const cities = await res.data;
        addCities((old: any) => [...old, cities]);
        closeCity(!openCity);
      });
  }

  async function loadStates() {
    await api.get("/states").then(async (res) => setSates(await res.data));
  }

  useEffect(() => {
    loadStates();
  }, []);

  return (
    <div className={`${openCity ? "" : "hidden"} modal`}>
      <div className="modal-content">
        <div className="modal-body">
          <button
            type="button"
            className="modal-close"
            onClick={() => closeCity(!openCity)}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Cadastrar Bairros
            </h3>
            <form
              className="flex flex-wrap -mx-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="basis-full md:basis-5/12 px-3 mb-5">
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
                    onChange={handleChangeList}
                  />
                </div>
                {errors.states_id && (
                  <small className="input-text-invalid">
                    Campo obrigatório
                  </small>
                )}
                <datalist id="states">
                  {states.map(({ id, state }) => (
                    <option key={id} value={state} />
                  ))}
                </datalist>
              </div>
              <div className="basis-full md:basis-9/12 px-3">
                <label className="label-form" htmlFor="city">
                  Cidade.
                </label>
                <input
                  type="text"
                  className={`input-form ${errors.city && "invalid"}`}
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <small className="input-text-invalid">
                    Campo obrigatório
                  </small>
                )}
              </div>
              <div className="basis-full mt-5 px-3">
                <button className="btn-primary" type="submit">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
