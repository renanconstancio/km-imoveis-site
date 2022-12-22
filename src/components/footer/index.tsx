// import logo from "../../assets/logo.svg";
import imgCaixa from "../../assets/caixa.png";
import imgBradesco from "../../assets/bradesco.png";
import imgSantander from "../../assets/santander.png";
import imgBB from "../../assets/banco-do-brasil.png";
import imgItau from "../../assets/itau.png";

import faWhatsapp from "../../assets/whatsapp-white.svg";
import faFacebook from "../../assets/facebook.svg";
// import faInstagram from "../../assets/instagram.svg";

import { ButtonWhatsappFloat } from "../button-whatsapp";
import { Title } from "../title";
import { Link } from "react-router-dom";
import { toNumber } from "../../utils/functions";

export function Footer() {
  return (
    <footer className="mt-5 bg-gray-900 text-white">
      <section className="container px-4 my-10 flex flex-row gap-5">
        <aside>
          <Title title="Correspondente" />
          <i>Faça seu finaciamento com a gente!</i>
          <section className="flex flex-row flex-wrap -mx-3">
            <span className="p-3 basis-1/5 md:basis-1/12">
              <img
                src={imgCaixa}
                alt="Correspondente - Caixa"
                className="rounded-lg"
              />
            </span>
            <span className="p-3 basis-1/5 md:basis-1/12">
              <img
                src={imgBradesco}
                alt="Correspondente - Bradesco"
                className="rounded-lg"
              />
            </span>
            <span className="p-3 basis-1/5 md:basis-1/12">
              <img
                src={imgSantander}
                alt="Correspondente - Santander"
                className="rounded-lg"
              />
            </span>
            <span className="p-3 basis-1/5 md:basis-1/12">
              <img
                src={imgBB}
                alt="Correspondente - BB"
                className="rounded-lg"
              />
            </span>
            <span className="p-3 basis-1/5 md:basis-1/12">
              <img
                src={imgItau}
                alt="Correspondente - Itau"
                className="rounded-lg"
              />
            </span>
          </section>
        </aside>
      </section>
      <section className="container px-4 my-10 flex flex-row flex-wrap">
        <aside className="basis-full md:basis-1/3">
          <Title title="Endereço" />
          <address>
            {import.meta.env.VITE_ADDRESS}
            <br />
            <span className="flex gap-3">
              <img src={faWhatsapp} alt="" style={{ width: 20 }} />
              <span>{import.meta.env.VITE_PHONE}</span>
            </span>
          </address>
        </aside>
        <aside className="basis-full md:basis-1/3">
          <Title title="Site" />
          <address className="flex flex-col flex-1 gap-3">
            <Link to="/">Inicio</Link>

            <Link to="/search">Imovéis</Link>

            <Link to="/">Quem Somos</Link>

            <a
              href={`https://api.whatsapp.com/send?phone=${toNumber(
                `55${import.meta.env.VITE_PHONE}`,
              )}&text=`}
              target="_blank"
              rel="noreferrer"
            >
              Contato
            </a>
          </address>
        </aside>
        <aside className="basis-full md:basis-1/3">
          <Title title="Redes Sociais" />
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKamilaMagalhae&tabs&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=844504053337220" style="height:130px;max-width:100%;border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>',
            }}
          />
        </aside>
      </section>
      <ButtonWhatsappFloat phone={import.meta.env.VITE_PHONE} text={""} />
    </footer>
  );
}
