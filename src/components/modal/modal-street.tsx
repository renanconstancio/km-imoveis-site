import { useForm } from "react-hook-form";
import { useState } from "react";
import { PropsStreet } from "../../global/types/types";
import { api } from "../../api/api";

type PropsModal = {
  isOpen: boolean;
  addStreets(data: any): void;
};

export default function ModalStreet({ isOpen, addStreets }: PropsModal) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsStreet>();

  async function onSubmit(data: PropsStreet) {
    await api.post(`/streets`, data).then(async res => {
      const category = await res.data;
      addStreets((old: any) => [...old, category]);
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
              Cadastrar Ruas, Avenidas, Aptos
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <label className="label-form" htmlFor="street">
                  Rua, Avenida, Apto.
                </label>
                <input
                  type="text"
                  className={`input-form ${errors.street && "invalid"}`}
                  {...register("street", { required: true })}
                />
                {errors.street && (
                  <small className="input-text-invalid">
                    Campo obrigatório
                  </small>
                )}
              </div>
              <div className="w-full">
                <label className="label-form" htmlFor="zip_code">
                  CEP
                </label>
                <input
                  type="text"
                  className={`input-form ${errors.zip_code && "invalid"}`}
                  {...register("zip_code", { required: false })}
                />
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
