import { TWhatsapp } from "./types";
import faWhatsapp from "../../assets/whatsapp-white.svg";
import { toNumber } from "../../utils/functions";

export default function ButtonWhatsappFloat(T: TWhatsapp) {
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${toNumber(
        `55${T.phone}`,
      )}&text=${encodeURI(T.text)}`}
      className="fixed w-14 h-14 bottom-8 right-8 bg-green-600 rounded-full flex items-center justify-center z-50"
      target="_blank"
      rel="noreferrer"
    >
      <img src={faWhatsapp} alt="" style={{ width: 30 }} />
    </a>
  );
}
