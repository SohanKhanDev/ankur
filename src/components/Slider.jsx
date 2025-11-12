import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import slider1 from "../assets/slider1.jpg";
import slider2 from "../assets/slider2 .jpg";
import slider3 from "../assets/slider3.jpg";
import slider4 from "../assets/slider4.jpg";
import slider5 from "../assets/slider5.jpg";

const Slider = () => {
  const slides = [
    {
      image: slider1,
      title: "Ankur",
      description:
        "Ankur connects the agricultural community—farmers, traders, and consumers—in one digital space for efficient commerce and communication.",
    },
    {
      image: slider2,
      title: "Connecting Farmers & Traders",
      description:
        "Build strong networks and seamless transactions between farmers and traders across the country.",
    },
    {
      image: slider3,
      title: "Efficient Commerce",
      description:
        "Trade your agricultural products quickly and safely with our easy-to-use digital marketplace.",
    },
    {
      image: slider4,
      title: "Real-Time Updates",
      description:
        "Stay updated with live market prices, offers, and availability to make informed decisions.",
    },
    {
      image: slider5,
      title: "Grow Your Business",
      description:
        "Expand your reach, find new buyers, and increase profitability with Ankur's digital platform.",
    },
  ];

  return (
    <div className="w-full mx-auto px-4 my-6 rounded-2xl overflow-hidden relative">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active custom-active",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            <div className="absolute top-1/4 left-6 sm:left-12 md:left-16 lg:left-24 text-left max-w-lg">
              <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="mt-4 text-white text-sm sm:text-base md:text-lg drop-shadow-md">
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
