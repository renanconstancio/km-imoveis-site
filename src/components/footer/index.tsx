import logo from "../../assets/logo.svg";

export function Footer() {
  return (
    <footer>
      <section className="container my-4 text-center">
        <img src={logo} alt="Logo" width={100} className="mx-auto" />
        <address>
          {import.meta.env.VITE_ADDRESS}
          <br />
          {import.meta.env.VITE_PHONE}
        </address>
      </section>
    </footer>
  );
}
