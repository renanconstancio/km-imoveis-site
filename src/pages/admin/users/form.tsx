import { api } from "../../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../../components/inputs";
import { maskPhone } from "../../../utils/mask";
import { useAuth } from "../../../hooks/use-auth";
import { SEO } from "../../../components/seo";
import { User } from "./list";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function FormUsers() {
  const navigate = useNavigate();

  const { auth } = useAuth();

  const { userId } = useParams<{ userId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User & { password: string }>();

  const { mutate } = useMutation({
    mutationFn: async (data: User & { password: string }) => {
      const newData = {
        ...data,
      };

      if (data.password) {
        newData.password = data.password;
      }

      return await api.patch(`/users`, { ...newData });
    },
    onError: (error) => {
      toast.error("Não foi possivel fazer o cadastro!");
      console.log(`${error}`);
    },
    onSuccess: async (resp) => {
      toast.success("Cadastro salvo com sucesso!");
      navigate({
        pathname: `/adm/users/${await resp.data?.id}/edit`,
      });
    },
  });

  useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (!userId) return null;
      return api.get<User>(`/users/${userId}`).then(async (res) => res.data);
    },
    onSuccess: (data) => {
      if (data) {
        reset(data);
      }
    },
  });

  // async function onSubmit(data: User & { password: string }) {
  //   const newData = {
  //     ...data,
  //   };

  //   if (data.password) {
  //     newData.password = data.password;
  //   }

  //   await api.patch(`/users`, newData).then(async (resp) => {
  //     navigate({ pathname: `/adm/users/${(await resp.data).id}/edit` });
  //   });
  // }

  // async function loadStreets() {
  //   await api.get(`/users/${userId}`).then(async (res) => {
  //     const resp: User = await res.data;
  //     reset({
  //       ...resp,
  //     });
  //   });
  // }

  // useEffect(() => {
  //   if (userId) loadStreets();
  // }, [userId]);

  return (
    <>
      <SEO
        title={`${userId ? "Editar" : "Cadastrar"} Usuários`}
        siteTitle={import.meta.env.VITE_TITLE}
      />

      <div className="overflow-x-auto rounded-sm bg-white p-6">
        <div className="border-b pb-3 mb-5 flex gap-3">
          <button className="btn-success btn-ico" type="submit" form="form">
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </button>

          <Link className="btn-warning btn-ico" to="/adm/users">
            <FontAwesomeIcon icon={faUndo} />
            <span>Voltar</span>
          </Link>
        </div>
        <form
          id="form"
          className="basis-full"
          onSubmit={handleSubmit(async (data) => mutate(data))}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="basis-full md:basis-2/12 px-3 mb-6">
              <label className="label-form" htmlFor="type">
                Tipo
              </label>
              <div className="relative">
                <select
                  className="input-form"
                  {...register("type", { required: false })}
                >
                  <option value="admin">Adiministrador</option>
                  <option value="user">Usuários</option>
                  {auth?.type === "root" && <option value="root">Root</option>}
                </select>
              </div>
            </div>
            <div className="basis-full"></div>
            <div className="basis-full md:basis-5/12 px-3 mb-6">
              <Input
                type="text"
                label="Nome *"
                className={`input-form ${errors.first_name && "invalid"}`}
                error={errors.first_name}
                register={register("first_name", {
                  required: {
                    value: true,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full"></div>
            <div className="basis-full md:basis-4/12 px-3 mb-6">
              <Input
                type="text"
                label="Sobrenome *"
                className={`input-form ${errors.last_name && "invalid"}`}
                error={errors.last_name}
                register={register("last_name", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full"></div>
            <div className="basis-full md:basis-4/12 px-3 mb-6">
              <Input
                type="text"
                label="E-mail *"
                className={`input-form ${errors.email && "invalid"}`}
                error={errors.email}
                register={register("email", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full"></div>{" "}
            <div className="basis-full md:basis-3/12 px-3 mb-6">
              <Input
                mask={maskPhone}
                type="tel"
                label="Telefone"
                className={`input-form ${errors.phone && "invalid"}`}
                error={errors.phone}
                register={register("phone", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full md:basis-3/12 px-3 mb-6">
              <Input
                type="text"
                label="CRECI"
                className={`input-form ${errors.creci && "invalid"}`}
                error={errors.creci}
                register={register("creci", {
                  required: {
                    value: false,
                    message: "Campo é obrigatório",
                  },
                })}
              />
            </div>
            <div className="basis-full"></div>
            <div className="basis-full md:basis-3/12 px-3 mb-6">
              <Input
                type="password"
                label="Senha *"
                className={`input-form`}
                onChange={(e) => setValue("password", e.target.value)}
                // error={errors.password}
                // register={register("password", {
                //   required: {
                //     value: false,
                //     message: "Campo é obrigatório",
                //   },
                // })}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
