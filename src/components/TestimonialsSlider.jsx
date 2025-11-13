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
    fetch(`http://ankur-server-ten.vercel.app/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
      });
  }, []);

  return (
    <section className="py-16 container mx-auto px-3 hidden md:block">
      {/* ----------*** :: TESTIMONIAL TITLE :: ***---------- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6 sm:mb-8 md:mb-10 text-center md:text-left">
        <div className="md:w-1/2">
          <p className="text-gray-600 max-w-2xl mx-auto md:mx-0 mb-6 md:mb-0 text-sm sm:text-base md:text-lg leading-relaxed">
            We are proud of the community we've built. Hear directly from the
            farmers, traders, and buyers who use Ankur to transform their
            agricultural transactions. Their experiences reflect the trust,
            efficiency, and growth fostered by our platform.
          </p>
        </div>

        <div className="text-right md:w-1/3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            <span className="text-primary"> What </span>
            <span className="text-secondary">Our Customers Are Saying!</span>
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold  mb-4">
          <span className="text-primary"> </span>{" "}
          <span className="text-secondary"> </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12"></p>

        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl md:text-5xl"></h1>
        </div>

        {/* ----------*** :: SLIDER :: ***---------- */}
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
