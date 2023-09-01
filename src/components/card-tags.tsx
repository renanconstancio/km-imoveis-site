import {
  faBath,
  faBed,
  faCar,
  faExpand,
  faFan,
  faPhoneVolume,
  faShower,
  faSink,
  faTv,
  faJugDetergent,
  faUtensils,
  faBowlFood,
  faWaterLadder,
  faKitchenSet,
  faSnowflake,
  faDoorOpen,
  faWind,
  faWarehouse,
  faSolarPanel,
  faSpa,
  faCheck,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type TCardTags = {
  cardTags: {
    tag: string;
    icon: string;
  }[];
  cardTag: string;
};

export function CardTags({ cardTags, cardTag }: TCardTags) {
  const arrayString = cardTag?.split(",");
  return (
    <>
      {cardTags.map(
        (label, index) =>
          arrayString.includes(`${label.tag}`) && (
            <span key={index}>
              {label.icon === "faTv" && <FontAwesomeIcon icon={faTv} />}
              {label.icon === "faSolarPanel" && (
                <FontAwesomeIcon icon={faSolarPanel} />
              )}
              {label.icon === "faCheck" && <FontAwesomeIcon icon={faCheck} />}
              {label.icon === "faSpa" && <FontAwesomeIcon icon={faSpa} />}
              {label.icon === "faBolt" && <FontAwesomeIcon icon={faBolt} />}
              {label.icon === "faCar" && <FontAwesomeIcon icon={faCar} />}
              {label.icon === "faBath" && <FontAwesomeIcon icon={faBath} />}
              {label.icon === "faKitchenSet" && (
                <FontAwesomeIcon icon={faKitchenSet} />
              )}
              {label.icon === "faWarehouse" && (
                <FontAwesomeIcon icon={faWarehouse} />
              )}
              {label.icon === "faWind" && <FontAwesomeIcon icon={faWind} />}
              {label.icon === "faSink" && <FontAwesomeIcon icon={faSink} />}
              {label.icon === "faBed" && <FontAwesomeIcon icon={faBed} />}
              {label.icon === "faExpand" && <FontAwesomeIcon icon={faExpand} />}
              {label.icon === "faFan" && <FontAwesomeIcon icon={faFan} />}
              {label.icon === "faSnowflake" && (
                <FontAwesomeIcon icon={faSnowflake} />
              )}
              {label.icon === "faJugDetergent" && (
                <FontAwesomeIcon icon={faJugDetergent} />
              )}
              {label.icon === "faBowlFood" && (
                <FontAwesomeIcon icon={faBowlFood} />
              )}
              {label.icon === "faDoorOpen" && (
                <FontAwesomeIcon icon={faDoorOpen} />
              )}
              {label.icon === "faWaterLadder" && (
                <FontAwesomeIcon icon={faWaterLadder} />
              )}
              {label.icon === "faUtensils" && (
                <FontAwesomeIcon icon={faUtensils} />
              )}
              {label.icon === "faShower" && <FontAwesomeIcon icon={faShower} />}
              {label.icon === "faPhoneVolume" && (
                <FontAwesomeIcon icon={faPhoneVolume} />
              )}{" "}
              {label.tag}
            </span>
          ),
      )}
    </>
  );
}
