import imgCaixa from "../../assets/caixa.png";
import faPhone from "../../assets/phone-solid.svg";
import faWhatsapp from "../../assets/whatsapp-white.svg";

import { ButtonWhatsappFloat } from "../button-whatsapp";
import { Title } from "../title";

export function Footer() {
  return (
    <footer className="mt-5 bg-gray-900 text-white">
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7419.614300789881!2d-48.823922694334144!3d-21.593449559974314!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bed1dfdbc3ffff%3A0x17f4f7cf60a3e56d!2sKM%20NEG%C3%93CIOS%20IMOBILI%C3%81RIOS!5e0!3m2!1spt-BR!2sbr!4v1685826305517!5m2!1spt-BR!2sbr" style="border: 0; width: 100%; height: 295px" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>',
        }}
      />

      <section className="container px-4 my-10 flex flex-row flex-wrap">
        <aside className="basis-full md:flex-1 flex flex-col gap-5">
          <div className="flex flex-row gap-5">
            <img
              src={imgCaixa}
              alt="Correspondente - Caixa"
              className="rounded-lg w-14 h-14 md:w-28 md:h-28"
            />
            <span>
              <Title title="Correspondente" mb="mb-0.5" mt="mt-0.5" />
              <i>Faça seu financiamento com a gente!</i>
            </span>
          </div>

          <div>
            <Title title="Endereço" mb="mb-0.5" mt="mt-0.5" />
            <address>
              {import.meta.env.VITE_ADDRESS}
              <br />
              <span className="flex gap-3">
                <img src={faPhone} alt="" style={{ width: 18 }} />
                <span>{import.meta.env.VITE_TEL}</span>
              </span>
              <span className="flex gap-3">
                <img src={faWhatsapp} alt="" style={{ width: 20 }} />
                <span>{import.meta.env.VITE_PHONE}</span>
              </span>
            </address>
          </div>
        </aside>
        <aside className="basis-full md:basis-1/3">
          <Title title="Redes Sociais" mt="mt-0.5" mb="mb-0.5" />
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKamilaMagalhae&tabs&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=844504053337220" style="height:155px;max-width:100%;width:100%;border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>',
            }}
          />
        </aside>
      </section>
      <ButtonWhatsappFloat phone={import.meta.env.VITE_PHONE} text={""} />
    </footer>
  );
}
