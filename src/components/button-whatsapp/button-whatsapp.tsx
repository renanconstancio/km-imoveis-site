import { PropsWhatsapp } from "../../global/types/types";
import faWhatsapp from "../../assets/whatsapp-white.svg";
import { toNumber } from "../../utils/functions";

export default function ButtonWhatsapp(props: PropsWhatsapp) {
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${toNumber(
        `55${props.phone}`,
      )}&text=${encodeURI(props.text)}`}
      target="_blank"
      rel="noreferrer"
      className="bg-green-600 rounded-full flex items-center justify-center gap-2 px-3 py-1 uppercase text-white font-play bold"
    >
      <img src={faWhatsapp} alt="" style={{ width: 32 }} />
      <span>Entrar em Contato</span>
    </a>
  );
}
