import { api } from "../../services/api";
import { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/use-alert";
import { Input } from "../../components/inputs";
import { maskPhone } from "../../utils/mask";
import { TUsers } from "../admin-users/types";

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
  } = useForm<TUsers & { password: string }>();

  const onSubmit = useCallback(async (data: TUsers & { password: string }) => {
    const newPostData = {
      ...data,
    };

    if (data.password) {
      newPostData.password = data.password;
    }

    if (userId) {
      await api
        .put(`/users/${userId}`, newPostData)
        .then(() =>
          changeAlert({
            message: "Dados salvos com sucesso.",
          }),
        )
        .catch(() =>
          changeAlert({
            message: "Não foi possivel fazer um novo cadastro para o imóvel.",
          }),
        );
      return;
    }

    await api
      .post(`/users`, newPostData)
      .then(async (resp) => {
        changeAlert({
          message: "Dados salvos com sucesso.",
        }),
          navigate({ pathname: `/adm/users/${(await resp.data).id}/edit` });
      })
      .catch(() =>
        changeAlert({
          message: "Não foi possivel fazer um novo cadastro para o imóvel.",
        }),
      );
  }, []);

  const loadStreets = useCallback(async () => {
    await api
      .get(`/users/${userId}`)
      .then(async (res) =>
        reset({
          ...(await res.data),
        }),
      )
      .catch(() =>
        changeAlert({
          message: "Não foi possivel conectar ao servidor.",
        }),
      );
  }, []);

  useEffect(() => {
    if (userId) loadStreets();
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
                  <option value="root">Root</option>
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
            <div className="basis-full"></div>
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
          </div>
        </form>
      </div>
    </>
  );
}
