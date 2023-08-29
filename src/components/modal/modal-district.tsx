import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Neighborhood,
  schemaNeighborhood,
} from "../../pages/admin/neighborhoods/form";

export type TModalDistrict = {
  addDistricts?: (data: any) => void;
};

export default function ModalDistrict({ addDistricts }: TModalDistrict) {
  const { openNeighborhoods, closeNeighborhoods } = useModal();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Neighborhood>({
    resolver: zodResolver(schemaNeighborhood),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Neighborhood) => {
      return await api.patch(`/neighborhoods`, { ...data });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async () => {
      toast.success("Cadastro salvo com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["neighborhoods"] });
    },
  });

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
            <form
              className="space-y-6"
              onSubmit={handleSubmit(async (data) => mutate(data))}
            >
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
