import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAuth } from "../../../hooks/use-auth";

import { Input } from "../../../components/inputs";
import { api } from "../../../services/api";
import { SEO } from "../../../components/seo";

import bgLogo from "../../../assets/logo.svg";
import bgLogin from "../../../assets/0cuf0u.jpg";

export type TUserLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserLogin>();

  const { mutate } = useMutation({
    mutationFn: async (data: TUserLogin) => {
      return await api.post(`/users/login`, { ...data });
    },
    onError: (error) => {
      toast.error("Usuário ou senha inválido!");
      console.log(`${error}`);
    },
    onSuccess: async (resp) => {
      const { user, token } = await resp.data;
      toast.success("Login realizado com sucesso!");
      login({
        id: user.id,
        name: user.first_name,
        type: user.type,
        token: token,
        roles: [],
      });
    },
  });

  return (
    <section
      className="h-screen"
      style={{ backgroundImage: `url(${bgLogin})`, backgroundSize: "cover" }}
    >
      <SEO title={`Login`} siteTitle={import.meta.env.VITE_TITLE} />
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full text-gray-800 ">
          <div className="md:basis-8/12 lg:basis-5/12 lg:ml-20 bg-white rounded-lg">
            <form
              onSubmit={handleSubmit(async (data) => mutate(data))}
              className="p-10"
            >
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
