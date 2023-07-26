import { Carousel } from "react-responsive-carousel";

type CarouselIconsProps = {
  images: string[];
  onClick: () => void;
};

export default function CarouselIcons({ images, onClick }: CarouselIconsProps) {
  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={false}
      showArrows={true}
      showIndicators={false}
      dynamicHeight={false}
      showThumbs={true}
      showStatus={false}
      centerSlidePercentage={100}
      width={"100%"}
    >
      {images.map((image) => (
        <div key={image} onClick={onClick} className="cursor-pointer">
          <img src={image} className="max-w-full" />
        </div>
      ))}
    </Carousel>
  );
}
