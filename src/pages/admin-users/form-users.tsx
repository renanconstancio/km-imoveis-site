import { api } from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { Input } from "../../components/inputs";
import { maskPhone } from "../../utils/mask";
import { useAuth } from "../../hooks/use-auth";
import { TUsers } from "./types";
import { Helmet } from "react-helmet-async";

export default function FormUsers() {
  const navigate = useNavigate();

  const { changeAlert } = useAlert();
  const { auth } = useAuth();

  const { userId } = useParams<{ userId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TUsers & { password: string }>();

  async function onSubmit(data: TUsers & { password: string }) {
    const newData = {
      ...data,
    };

    if (data.password) {
      newData.password = data.password;
    }

    await api
      .patch(`/users`, newData)
      .then(async resp => {
        changeAlert({
          message: "Dados salvos com sucesso.",
        }),
          navigate({ pathname: `/adm/users/${(await resp.data).id}/edit` });
      })
      .catch(error => {
        changeAlert({
          title: "Atenção",
          message: "Não foi possivel fazer o cadastro!",
          variant: "danger",
        });

        if (error.response.status === 422)
          changeAlert({
            title: "Atenção",
            variant: "danger",
            message: `${error.response.data.message}`,
          });
      });
  }

  async function loadStreets() {
    await api
      .get(`/users/${userId}`)
      .then(async res => {
        const resp: TUsers = await res.data;
        reset({
          ...resp,
        });
      })
      .catch(() =>
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        }),
      );
  }

  useEffect(() => {
    if (userId) loadStreets();
  }, [userId]);

  return (
    <>
      <Helmet>
        <title>
          {userId ? "Editar" : "Cadastrar"}
          Usuários - {import.meta.env.VITE_TITLE}
        </title>
      </Helmet>
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
          onSubmit={handleSubmit(onSubmit)}
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
                onChange={e => setValue("password", e.target.value)}
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
