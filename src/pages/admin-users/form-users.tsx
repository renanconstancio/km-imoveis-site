import { PropsUsers } from "../../global/types/types";

import { api } from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { Input } from "../../components/inputs";
import { maskPhone } from "../../utils/mask";

export default function FormUsers() {
  const { changeAlert } = useAlert();

  const navigate = useNavigate();

  const { userId } = useParams<{ userId: string | undefined }>();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PropsUsers & { password: string }>();

  async function onSubmit(data: PropsUsers & { password: string }) {
    const newPostData = {
      ...data,
    };

    if (data.password) {
      newPostData.password = data.password;
    }

    if (data.id)
      await api
        .put(`/users/${userId}`, newPostData)
        .then(() =>
          changeAlert({
            message: "Dados salvos com sucesso.",
          }),
        )
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro para o imovél.",
          }),
        );
    else
      await api
        .post(`/users`, newPostData)
        .then(async resp => {
          changeAlert({
            message: "Dados salvos com sucesso.",
          }),
            navigate({ pathname: `/adm/users/${(await resp.data).id}/edit` });
        })
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro para o imovél.",
          }),
        );
  }

  async function loadStreets() {
    await api
      .get(`/users/${userId}`)
      .then(async res => {
        const resp = (await res.data) as PropsUsers;
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
    (async () => {
      if (userId) loadStreets();
    })();
  }, [userId]);

  return (
    <>
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
        <form className="w-full" id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-2/12 px-3 mb-6">
              <label className="label-form" htmlFor="type">
                Tipo
              </label>
              <div className="relative">
                <select
                  className="input-form"
                  {...register("type", { required: false })}
                >
                  <option value="admin">Adiministrador</option>
                  <option value="user">Usários</option>
                  <option value="root">Root</option>
                </select>
              </div>
            </div>
            <div className="w-full"></div>
            <div className="w-full md:w-5/12 px-3 mb-6">
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
            <div className="w-full"></div>
            <div className="w-full md:w-4/12 px-3 mb-6">
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
            <div className="w-full"></div>
            <div className="w-full md:w-4/12 px-3 mb-6">
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
            <div className="w-full"></div>
            <div className="w-full md:w-3/12 px-3 mb-6">
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
            <div className="w-full"></div>
            <div className="w-full md:w-3/12 px-3 mb-6">
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
          </div>
        </form>
      </div>
    </>
  );
}
