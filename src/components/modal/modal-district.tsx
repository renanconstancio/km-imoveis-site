import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/use-modal";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsNeighborhoods } from "../../pages/admin-neighborhoods/types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../services/api";

export type PropsModalDistrict = {
  addDistricts: (data: any) => void;
};

export default function ModalDistrict({ addDistricts }: PropsModalDistrict) {
  const { openNeighborhoods, closeNeighborhoods } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsNeighborhoods>();

  const onSubmit = useCallback(async (data: PropsNeighborhoods) => {
    await api.post(`/neighborhoods`, data).then(async res => {
      const category = await res.data;
      addDistricts((old: any) => [...old, category]);
      closeNeighborhoods(!openNeighborhoods);
    });
  }, []);

  return (
    <div className={`${openNeighborhoods ? "" : "hidden"} modal`}>
      <div className="modal-content">
        <div className="modal-body">
          <button
            type="button"
            className="modal-close"
            onClick={() => closeNeighborhoods(!openNeighborhoods)}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
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
