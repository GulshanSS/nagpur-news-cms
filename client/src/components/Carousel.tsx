import { useState } from "react";
import { Media } from "../redux/api/types";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

type Props = {
  slides: Media[];
  heightVariant: string;
};

const Carousel = ({ slides, heightVariant }: Props) => {
  const variant: any = {
    small: "h-[100px]",
    large: "h-[400px]",
    normal: "h-[200px]",
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className="w-full relative group">
        <div
          className={`${variant[heightVariant]} flex justify-center bg-black rounded-t-md`}
        >
          {slides[currentIndex].type.startsWith("image/") && (
            <img
              alt={slides[currentIndex].articleId}
              className="h-full object-cover rounded-t-md duration-500"
              src={slides[currentIndex].key}
            />
          )}
          {slides[currentIndex].type.startsWith("video/") && (
            <video
              className={`${variant[heightVariant]} w-full`}
              src={slides[currentIndex].key}
              controls={true}
              autoPlay={false}
            />
          )}
        </div>
        {slides.length > 1 && (
          <>
            <div
              onClick={prevSlide}
              className="md:hidden md:group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-70%] left-5 text-2xl rounded-full p-2 bg-custom-800 bg-opacity-20 text-custom-50 cursor-pointer"
            >
              <BsChevronCompactLeft size={30} />
            </div>
            <div
              onClick={nextSlide}
              className="md:hidden md:group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-70%] right-5 text-2xl rounded-full p-2 bg-custom-800 bg-opacity-20 text-custom-50 cursor-pointer"
            >
              <BsChevronCompactRight size={30} />
            </div>
          </>
        )}

        <div className="flex w-full justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              className="text-xl cursor-pointer"
              key={slide.id}
              onClick={() => setCurrentIndex(slideIndex)}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
