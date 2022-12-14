import { Carousel } from "react-responsive-carousel";
import { LazyImage } from "../lazy-image";
import logoSite from "../../assets/logo.png";

export default function CarouselIcons({ images }: { images: string[] }) {
  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      showArrows={true}
      showIndicators={false}
      dynamicHeight={false}
      showThumbs={true}
      showStatus={true}
      centerSlidePercentage={100}
      width={"100%"}
    >
      {images.map((image) => (
        <div key={image}>
          <LazyImage placeholder={logoSite} src={image} className="w-full" />
          {/* <img src={image} className="w-full" /> */}
        </div>
      ))}
    </Carousel>
  );
}
