import { useAuth } from "../../hooks/use-auth";

import bgLogin from "../../assets/0cuf0u.jpg";
import bgLogo from "../../assets/logo.svg";
import { useAlert } from "../../hooks/use-alert";
import { useForm } from "react-hook-form";
import { Input } from "../../components/inputs";
import { Alert } from "../../components/alert";
import { api } from "../../services/api";

type PropsUserLogin = {
  email: string;
  password: string;
};

export function Login() {
  const { login } = useAuth();
  const { alert, changeAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsUserLogin>();

  async function onSubmit(data: PropsUserLogin) {
    await api
      .post(`/users/login`, data)
      .then(async res => {
        const { user, token } = await res.data;
        login({
          id: user.id,
          name: user.last_name,
          token: token,
          roles: [],
        });
      })
      .catch(() =>
        changeAlert({
          message: "E-mail/Senha incorreto!.",
        }),
      );
  }

  return (
    <section
      className="h-screen"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full text-gray-800 ">
          <div className="md:basis-8/12 lg:basis-5/12 lg:ml-20 bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="p-10">
              <div className="pb-5">
                <img
                  src={bgLogo}
                  alt="Logo"
                  width={"135"}
                  className="block mx-auto"
                />
              </div>
              <div className="mb-6">
                <Input
                  type="email"
                  label="E-mail *"
                  className={`input-form ${errors.email && "invalid"}`}
                  error={errors.email}
                  register={register("email", {
                    required: {
                      value: true,
                      message: "Campo é obrigatório",
                    },
                  })}
                />
              </div>

              <div className="mb-6">
                <Input
                  type="password"
                  label="Senha *"
                  className={`input-form ${errors.password && "invalid"}`}
                  error={errors.password}
                  register={register("password", {
                    required: {
                      value: true,
                      message: "Campo é obrigatório",
                    },
                  })}
                />
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Fazer Login
              </button>
              {alert.message && (
                <div className="mt-7">
                  <Alert message={alert.message} title={alert.title} />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
