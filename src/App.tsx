import { CarouselIcons, CarouselIndex } from "./components/Carousel";
import { Header } from "./components/Header";
import { H2Title } from "./components/Title";

export default function App() {
  return (
    <>
      <Header />
      <CarouselIndex />
      <div className="border-b border-gray-200 py-2">
        <ul className="container grid grid-cols-4 gap-4 mx-auto px-4">
          <li>
            <CarouselIcons />
            <H2Title title="Teste" />
            <address>sdopf</address>
          </li>
        </ul>
      </div>
    </>
  );
}
