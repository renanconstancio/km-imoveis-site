import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
type PropsImmobles = {
  id: string;
  streets_id: string;
  number: string;
  description: string;
  sale_price: number;
  rent_price: number;
  published: "yes" | "no";
  situation: "leased" | "sold" | "available";
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

type PropsStreets = {
  id: string;
  street: string;
  zip_code: string;
  city: {
    city: string;
    state: {
      state: string;
    };
  };
};

export default function FormImmobles() {
  const [streets, setStreets] = useState<PropsStreets[]>([]);
  const navigate = useNavigate();
  const { immobleId } = useParams();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropsImmobles>();

  async function onSubmit(data: PropsImmobles) {
    console.log(data);
    const streets_id = streets.find(
      item =>
        [
          item.street,
          item.zip_code,
          item.city.city,
          item.city.state.state,
        ].join(", ") === data.streets_id,
    );

    if (data.id)
      await api
        .put(`/immobiles/${immobleId}`, { data, ...streets_id })
        .then(async res => reset(await res.data));
    else
      await api.post(`/immobiles`, { data, ...streets_id }).then(async res => {
        const { id } = await res.data;
        navigate(`/adm/immobiles/${id}/edit`);
      });
  }

  useEffect(() => {
    (async () => {
      api.get("/streets").then(async res => setStreets(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (immobleId)
        api
          .get(`/immobiles/${immobleId}`)
          .then(async res => reset(await res.data));
    })();
  }, [immobleId, reset]);

  // if (immobiles.length) return <Loading />;

  return (
    <>
      <div className="border-b pb-3 mb-5 flex gap-3">
        <button className="btn-primary" type="submit" form="form">
          Salvar
        </button>
        <Link className="btn-warning" to="/adm/immobiles">
          Voltar
        </Link>
      </div>
      <form className="w-full" id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-10/12 px-3">
            <label className="label-form" htmlFor="description">
              Nome do Imovél
            </label>
            <input
              type="text"
              className={`input-form ${errors.description && "invalid"}`}
              {...register("description", { required: true })}
            />
            {errors.description && (
              <small className="input-text-invalid">Campo obrigatório</small>
            )}
          </div>
          <div className="w-full md:w-2/12 px-3">
            <label className="label-form" htmlFor="number">
              Número
            </label>
            <input
              type="text"
              className="input-form"
              {...register("number", { required: false })}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-2/12 px-3 mb-6">
            <label className="label-form" htmlFor="situation">
              Situação
            </label>
            <div className="relative">
              <select
                className="input-form"
                {...register("situation", { required: false })}
              >
                <option value="leased">Alugado</option>
                <option value="sold">Vendido</option>
                <option value="available">Disponível</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-2/12 px-3 mb-6">
            <label className="label-form" htmlFor="published">
              Web
            </label>
            <div className="relative">
              <select
                className="input-form"
                defaultValue={"no"}
                {...register("published", { required: false })}
              >
                <option value={"yes"}>Publicar</option>
                <option value={"no"}>Congelar</option>
              </select>
            </div>
          </div>

          <div className="w-full md:w-3/12 px-3">
            <label className="label-form" htmlFor="sale_price">
              Preço Venda
            </label>
            <input
              type="text"
              className="input-form"
              {...register("sale_price", { required: false })}
            />
          </div>
          <div className="w-full md:w-3/12 px-3">
            <label className="label-form" htmlFor="rent_price">
              Preço Venda/Aluguel
            </label>
            <input
              type="text"
              className="input-form"
              {...register("rent_price", { required: false })}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-7/12 px-3 mb-6">
            <label className="label-form" htmlFor="streets_id">
              Nome da Rua
            </label>
            <div className="relative">
              <input
                list="streets_id"
                type="search"
                className={`input-form ${errors.streets_id && "invalid"}`}
                placeholder="Pesquisa nome da rua"
                {...register("streets_id", { required: true })}
              />
              {errors.streets_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="streets_id">
                {streets.map(({ id, street, zip_code, city }) => (
                  <option
                    key={id}
                    value={[street, zip_code, city.city, city.state.state].join(
                      ", ",
                    )}
                  />
                ))}
              </datalist>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
