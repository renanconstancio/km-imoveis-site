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
      className="-mx-5 sm:mx-0"
    >
      {images.map((image) => (
        <div key={image} onClick={onClick} className="cursor-pointer">
          <img src={image} className="w-full rounded-lg" />
        </div>
      ))}
    </Carousel>
  );
}
