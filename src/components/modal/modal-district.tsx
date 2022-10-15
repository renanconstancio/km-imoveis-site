import { useForm } from "react-hook-form";
import { useState } from "react";
import { PropsDistrict } from "../../global/types/types";
import { api } from "../../api/api";

type PropsModal = {
  isOpen: boolean;
  addDistricts(data: any): void;
};

export default function ModalDistrict({ isOpen, addDistricts }: PropsModal) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsDistrict>();

  async function onSubmit(data: PropsDistrict) {
    await api.post(`/districts`, data).then(async res => {
      const category = await res.data;
      addDistricts((oldState: any) => [...oldState, category]);
      setIsOpen(!modalIsOpen);
    });
  }

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
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <label className="label-form" htmlFor="district">
                  Nome do bairro.
                </label>
                <input
                  type="text"
                  className={`input-form ${errors.district && "invalid"}`}
                  {...register("district", { required: true })}
                />
                {errors.district && (
                  <small className="input-text-invalid">
                    Campo obrigatório
                  </small>
                )}
              </div>

              <button className="btn-primary" type="submit">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
