import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { PropsCities } from "../../global/types/types";
import { api } from "../../api/api";

type PropsModal = {
  isOpen: boolean;
  addCities(data: any): void;
};

export default function ModalCity({ isOpen, addCities }: PropsModal) {
  const [states, setSates] = useState([]);
  const [statesId, setSatesId] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsCities>();

  const handleChangeList = (event: any) => {
    const { id }: any = states.find(
      (e: { state: string }) => e.state === event.target.value,
    );

    setSatesId(id);
  };

  async function onSubmit(data: PropsCities) {
    await api
      .post(`/cities`, { city: data.city, states_id: statesId })
      .then(async res => {
        const cities = await res.data;
        // addCities((oldState: any) => [...oldState, cities]);
        setIsOpen(!modalIsOpen);
      });
  }

  useEffect(() => {
    (async () => {
      api.get("/states").then(async res => setSates(await res.data));
    })();
  }, []);

  return (
    <div className={`${modalIsOpen !== isOpen ? "" : "hidden"} modal`}>
      <div className="modal-content">
        <div className="modal-body">
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsOpen(!modalIsOpen)}
          >
            <i className="fas fa-times text-lg"></i>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Cadatrar Bairros
            </h3>
            <form
              className="flex flex-wrap -mx-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full md:w-5/12 px-3 mb-5">
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
              <div className="w-full md:w-9/12 px-3">
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
              <div className="w-full mt-5 px-3">
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