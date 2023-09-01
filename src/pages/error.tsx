import { Filters } from "../components/filters";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

export function Error() {
  // const error: any = useRouteError();

  return (
    <div className="bg-gray-200 flex flex-1 flex-col relative">
      <Header />

      {/* {location.pathname === "/" && (
        <div className="bg-slate-100">
          <section className="container px-4 flex flex-wrap items-center">
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <Filters />
            </div>
            <div className="w-full md:w-2/3 mb-5 mt-5 md:m-0">
              {banners.length ? <CarouselIndex banners={banners} /> : ""}
            </div>
          </section>
        </div>
      )} */}

      {location.pathname !== "/" && (
        <div className="bg-slate-100 -mt-2 mb-5">
          <section className="container p-5">
            <Filters variant="row" />
          </section>
        </div>
      )}

      <div className="container">
        <h1 className="font-play text-9xl mb-5">Oops!</h1>
        <p>Descupe, não consegui a página que você digitou.</p>
        <p>
          <i className="font-play font-bold">
            {/* {error.statusText || error.message} */}
          </i>
        </p>
      </div>
      <Footer />
    </div>
  );
}
