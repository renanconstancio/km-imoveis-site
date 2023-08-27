import { TWhatsapp } from "./types";
import faWhatsapp from "../../assets/whatsapp-white.svg";
import { toNumber } from "../../utils/functions";

export default function ButtonWhatsapp(T: TWhatsapp) {
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${toNumber(
        `55${T.phone}`,
      )}&text=${encodeURI(T.text)}`}
      target="_blank"
      rel="noreferrer"
      className="bg-green-600 rounded-lg shadow-md flex items-center justify-center gap-2 px-4 py-2 uppercase text-white font-play bold"
    >
      <img src={faWhatsapp} alt="" style={{ width: 32 }} />
      <span>Entrar em Contato</span>
    </a>
  );
}
