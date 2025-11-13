import React from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBox } from "react-icons/fa";
import { FaWeightScale } from "react-icons/fa6";
import { Link } from "react-router";

const CropsCard = ({ crop }) => {
  const { _id, description, image, name, pricePerUnit, quantity, type, unit } =
    crop;

  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="900"
      data-aos-easing="ease-out-cubic"
      className="flex justify-center items-center p-3 sm:p-4"
    >
      <div className="w-full rounded-2xl overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
        {/* ----------*** :: CROPS PHOTO :: ***---------- */}
        <div className="relative h-48 sm:h-56 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x300/f3f4f6/374151?text=No+Image";
            }}
          />
        </div>

        <div className="p-4 sm:p-6 bg-gray-50">
          {/* ----------*** :: CROPS NAME :: ***---------- */}
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 capitalize truncate">
            {name}
          </h2>

          {/* ----------*** :: CROPS TAGS :: ***---------- */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full capitalize">
              <BiSolidCategoryAlt size={14} /> {type}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-green-600 text-white rounded-full">
              <FaBox size={14} /> {quantity}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-amber-500 text-white rounded-full uppercase">
              <FaWeightScale size={14} /> {unit}
            </span>
          </div>

          {/* ----------*** :: CROPS DESCRIPTION :: ***---------- */}
          <p className="text-gray-600  min-h-20 mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
            {description}
          </p>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              {/* ----------*** :: CROPS UNIT PRICE :: ***---------- */}
              <p className="text-xs uppercase text-gray-500 font-medium">
                Price / {unit}
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-gray-900">
                {pricePerUnit}
                <span className="text-sm sm:text-base font-semibold text-gray-600 ml-1">
                  TK
                </span>
              </p>
            </div>

            {/* ----------*** :: BTN => DETAILS :: ***---------- */}
            <Link
              to={`/crops/${_id}`}
              className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm sm:text-base transition-colors duration-300 hover:bg-secondary"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropsCard;
