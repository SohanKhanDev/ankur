import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSlider = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const [testimonials, setTestimonials] = useState([]);

  /*** ----------*** :: DB FETCH => TESTIMONIALS :: ***---------- ***/
  useEffect(() => {
    fetch(`http://localhost:3000/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
      });
  }, []);

  console.log(testimonials);

  return (
    <section className="py-16  hidden md:block">
      <div className="container mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-12"></h2>
        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl md:text-5xl">
            What Our Customers Are Saying!
          </h1>
        </div>

        {/* --- slider --- */}
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active custom-active",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="pb-12"
        >
          {testimonials.map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <TestimonialCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
