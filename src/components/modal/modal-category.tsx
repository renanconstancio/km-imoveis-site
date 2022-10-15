import { useForm } from "react-hook-form";
import { useState } from "react";
import { PropsCategory } from "../../global/types/types";
import { api } from "../../api/api";

type PropsModal = {
  isOpen: boolean;
  addCategories(data: any): void;
};

export default function ModalCategory({ isOpen, addCategories }: PropsModal) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsCategory>();

  async function onSubmit(data: PropsCategory) {
    await api.post(`/categories`, data).then(async res => {
      const category = await res.data;
      addCategories((old: any) => [...old, category]);
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
              Cadastrar Nova Categoria
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <label className="label-form" htmlFor="category">
                  Descrição do Imovél
                </label>
                <input
                  type="text"
                  className={`input-form ${errors.category && "invalid"}`}
                  {...register("category", { required: true })}
                />
                {errors.category && (
                  <small className="input-text-invalid">
                    Campo obrigatório
                  </small>
                )}
              </div>
              <div className="w-full">
                <label className="label-form" htmlFor="filter">
                  Filtro?
                </label>
                <div className="relative">
                  <select
                    className="input-form"
                    {...register("filter", { required: false })}
                  >
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                  </select>
                </div>
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
