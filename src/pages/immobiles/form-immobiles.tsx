import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { ModalCategory } from "../../components/modal";

type PropsImmobles = {
  id: string;
  cities_id: string;
  neighborhoods_id: string;
  streets_id: string;
  categories_id: string;
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

type PropsCategories = {
  id: string;
  category: string;
  filter: string;
};

type PropsStreets = {
  id: string;
  street: string;
  zip_code: string;
};

type PropsNeighborhoods = {
  id: string;
  district: string;
};

type PropsCities = {
  id: string;
  city: string;
  state: {
    state: string;
  };
};

export default function FormImmobles() {
  const [cities, setCities] = useState<PropsCities[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<PropsNeighborhoods[]>([]);
  const [streets, setStreets] = useState<PropsStreets[]>([]);
  const [categories, setCategories] = useState<PropsCategories[]>([]);

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
      item => [item.street, item.zip_code].join(", ") === data.streets_id,
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
      api.get("/categories").then(async res => setCategories(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api.get("/cities").then(async res => setCities(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api.get("/districts").then(async res => setNeighborhoods(await res.data));
    })();
  }, []);

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
    <div className="overflow-x-auto rounded-sm bg-white p-6">
      <ModalCategory isOpen={true} />

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
              Descrição do Imovél
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
          <div className="w-full md:w-2/12 px-3">
            <label className="label-form" htmlFor="sale_price">
              Preço Venda
            </label>
            <input
              type="text"
              className="input-form"
              {...register("sale_price", { required: false })}
            />
          </div>
          <div className="w-full md:w-2/12 px-3">
            <label className="label-form" htmlFor="rent_price">
              Preço Aluguel
            </label>
            <input
              type="text"
              className="input-form"
              {...register("rent_price", { required: false })}
            />
          </div>
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
          <div className="w-full md:w-4/12 px-3 mb-6">
            <label className="label-form" htmlFor="categories_id">
              Categoria
            </label>
            <div className="relative">
              <input
                list="categories_id"
                type="search"
                className={`input-form ${errors.categories_id && "invalid"}`}
                placeholder="Pesquisar..."
                {...register("categories_id", { required: true })}
              />
              {errors.categories_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="categories_id">
                {categories.map(({ id, category }) => (
                  <option key={id} value={[category].join(", ")} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-6/12 px-3 mb-6">
            <label className="label-form" htmlFor="streets_id">
              Rua
            </label>
            <div className="relative">
              <input
                list="streets_id"
                type="search"
                className={`input-form ${errors.streets_id && "invalid"}`}
                placeholder="Pesquisar..."
                {...register("streets_id", { required: true })}
              />
              {errors.streets_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="streets_id">
                {streets.map(({ id, street }) => (
                  <option key={id} value={[street].join(", ")} />
                ))}
              </datalist>
            </div>
          </div>
          <div className="w-full md:w-3/12 px-3 mb-6">
            <label className="label-form" htmlFor="neighborhoods_id">
              Bairro
            </label>
            <div className="relative">
              <input
                list="neighborhoods_id"
                type="search"
                className={`input-form ${errors.neighborhoods_id && "invalid"}`}
                placeholder="Pesquisar..."
                {...register("neighborhoods_id", { required: true })}
              />
              {errors.neighborhoods_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="neighborhoods_id">
                {neighborhoods.map(({ id, district }) => (
                  <option key={id} value={[district].join(", ")} />
                ))}
              </datalist>
            </div>
          </div>
          <div className="w-full md:w-3/12 px-3 mb-6">
            <label className="label-form" htmlFor="cities_id">
              Cidade
            </label>
            <div className="relative">
              <input
                list="cities_id"
                type="search"
                className={`input-form ${errors.cities_id && "invalid"}`}
                placeholder="Pesquisar..."
                {...register("cities_id", { required: true })}
              />
              {errors.cities_id && (
                <small className="input-text-invalid">Campo obrigatório</small>
              )}
              <datalist id="cities_id">
                {cities.map(({ id, city, state }) => (
                  <option key={id} value={[city, state.state].join("/")} />
                ))}
              </datalist>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
