import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

/** --- star icon for review top --- **/
const StarIcon = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <FaStar
        key={i}
        className={`h-5 w-5 transition-transform duration-300 ${
          i < rating ? "text-yellow-500 scale-110" : "text-gray-300"
        }`}
      />
    ));
  return <div className="flex justify-center gap-1 mb-4">{stars}</div>;
};

/** --- main component --- **/
const TestimonialCard = ({ review }) => {
  const { name, rating, text } = review;

  return (
    <div className="relative bg-white/80 backdrop-blur-md border border-gray-200 h-[280px] p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
      {/* --- quote icon --- */}
      <div className="absolute top-4 left-4 text-indigo-300 text-xl opacity-40">
        <FaQuoteLeft />
      </div>
      <div>
        {/* --- review star --- */}
        <StarIcon rating={rating} />

        {/* --- review text --- */}
        <p className="text-gray-600 text-base italic mb-6 leading-relaxed">
          {text}
        </p>
      </div>
      {/* --- reviewer name --- */}
      <p className="text-lg font-bold text-gray-900 text-center mt-4">
        — {name}
      </p>
    </div>
  );
};

export default TestimonialCard;
