import logo from "../../assets/logo.svg";
import { ButtonWhatsappFloat } from "../button-whatsapp";

export function Footer() {
  return (
    <footer className="mt-5 bg-gray-900 text-gray-400">
      <section className="container px-4 my-10 flex flex-row gap-5">
        <img src={logo} alt="Logo" width={100} />
        <address>
          {import.meta.env.VITE_ADDRESS}
          <br />
          {import.meta.env.VITE_PHONE}
        </address>
      </section>
      <ButtonWhatsappFloat
        phone={import.meta.env.VITE_PHONE}
        text={"Olá, estou entrando em contato, porque estou a procura de casas"}
      />
    </footer>
  );
}
