import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";

export function CarouselIndex() {
  return (
    <Carousel showArrows={true} dynamicHeight={false} showThumbs={false}>
      <div style={{ height: 430 }}>
        <img src="/imgs/banners/banner-a.jpg" />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div style={{ height: 430 }}>
        <img src="/imgs/banners/banner-b.jpg" />
        {/* <p className="legend">Legend 2</p> */}
      </div>
    </Carousel>
  );
}

export function CarouselIcons({ images }: { images: string[] }) {
  return (
    <Carousel
      showArrows={true}
      showIndicators={false}
      dynamicHeight={false}
      showThumbs={false}
      showStatus={false}
      centerSlidePercentage={100}
      width={"100%"}
    >
      {images.map(image => (
        <div key={image}>
          <img src={image} className="object-cover h-64 w-96" />
        </div>
      ))}
    </Carousel>
  );
}
