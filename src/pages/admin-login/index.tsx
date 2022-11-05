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
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20 bg-white">
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

              {/*<div className="flex justify-between items-center mb-6">
                 <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck3"
                    checked
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div> 
                <a
                  href="#!"
                  className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </a>
              </div>*/}

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
              {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">OR</p>
              </div>

              <a
                className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                href="#!"
                role="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="w-3.5 h-3.5 mr-2"
                >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
                Continue with Facebook
              </a>
              <a
                className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                href="#!"
                role="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-3.5 h-3.5 mr-2"
                >
                  <path
                    fill="currentColor"
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  />
                </svg>
                Continue with Twitter
              </a> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}