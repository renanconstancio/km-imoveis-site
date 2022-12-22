import { Carousel } from "react-responsive-carousel";

export default function CarouselIcons({ images }: { images: string[] }) {
  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      showArrows={true}
      showIndicators={false}
      dynamicHeight={false}
      showThumbs={true}
      showStatus={false}
      centerSlidePercentage={100}
      width={"100%"}
    >
      {images.map((image) => (
        <div key={image}>
          <img src={image} className="max-w-full" />
        </div>
      ))}
    </Carousel>
  );
}
