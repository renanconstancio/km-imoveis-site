import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../inputs";
import { maskCep } from "../../utils/mask";
import { TStreets } from "../../pages/admin-streets/types";

type TModalStreet = {
  addStreets: (data: any) => void;
};

export default function ModalStreet({ addStreets }: TModalStreet) {
  const { openStreet, closeStreet } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStreets>();

  async function onSubmit(data: TStreets) {
    await api.post(`/streets`, data).then(async res => {
      const category = await res.data;
      addStreets((old: any) => [...old, category]);
      closeStreet(!openStreet);
    });
  }

  return (
    <div className={`${openStreet ? "" : "hidden"} modal`}>
      <div className="modal-content">
        <div className="modal-body">
          <button
            type="button"
            className="modal-close"
            onClick={() => closeStreet(!openStreet)}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Cadastrar Ruas, Avenidas, Aptos
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <Input
                  type="text"
                  label="Rua, Avenida, Apto. *"
                  className={`input-form ${errors.street && "invalid"}`}
                  error={errors.street}
                  register={register("street", {
                    required: {
                      value: true,
                      message: "Campo é obrigatório",
                    },
                  })}
                />
              </div>
              <div className="w-full">
                <Input
                  mask={maskCep}
                  type="text"
                  label="CEP *"
                  className={`input-form ${errors.zip_code && "invalid"}`}
                  error={errors.zip_code}
                  register={register("zip_code", {
                    required: {
                      value: false,
                      message: "Campo é obrigatório",
                    },
                  })}
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
