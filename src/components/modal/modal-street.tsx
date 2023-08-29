import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Street, schemaStreet } from "../../pages/admin/streets/form";

import { Input } from "../inputs";
import { maskCep } from "../../utils/mask";

type TModalStreet = {
  addStreets?: (data: any) => void;
};

export default function ModalStreet({ addStreets }: TModalStreet) {
  const { openStreet, closeStreet } = useModal();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Street>({
    resolver: zodResolver(schemaStreet),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Street) => {
      return await api.patch(`/streets`, { ...data });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async () => {
      toast.success("Cadastro salvo com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["streets"] });
    },
  });

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
            <form
              className="space-y-6"
              onSubmit={handleSubmit(async (data) => mutate(data))}
            >
              <div className="w-full">
                <Input
                  type="text"
                  label="Rua, Avenida, Apto. *"
                  className={`input-form ${errors.street && "invalid"}`}
                  error={errors.street}
                  register={register("street")}
                />
              </div>
              <div className="w-full">
                <Input
                  mask={maskCep}
                  type="text"
                  label="CEP *"
                  className={`input-form ${errors.zip_code && "invalid"}`}
                  error={errors.zip_code}
                  register={register("zip_code")}
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
