import React from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBox } from "react-icons/fa";
import { FaWeightScale } from "react-icons/fa6";
import { Link } from "react-router";

const CropsCard = ({ crop }) => {
  const { description, image, name, pricePerUnit, quantity, type, unit } = crop;

  return (
    <div className="flex justify-center items-center  bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-xl bg-white/90 backdrop-blur-md transition duration-500 hover:shadow-2xl">
        {/* ----------*** :: CROPS IMAGE :: ***---------- */}
        <div className="relative h-64 flex items-center justify-center rounded-t-3xl bg-gray-50 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover drop-shadow-xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x300/f3f4f6/374151?text=No+Image";
            }}
          />
        </div>

        {/* ----------*** :: CROPS CONTENTS :: ***---------- */}
        <div className="p-6 bg-gray-50 rounded-b-3xl">
          {/* ----------*** :: CROPS NAME :: ***---------- */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
            {name}
          </h2>

          {/* ----------*** :: CROPS TYPE :: ***---------- */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="flex items-center gap-2 px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-md capitalize">
              <BiSolidCategoryAlt size={15} /> {type}
            </span>

            {/* ----------*** :: CROPS QTY :: ***---------- */}
            <span className="flex items-center gap-2 px-3 py-1 text-xs font-medium bg-green-600 text-white rounded-md">
              <FaBox size={15} />
              {quantity}
            </span>

            {/* ----------*** :: CROPS UNIT :: ***---------- */}
            <span className="flex items-center gap-2 px-3 py-1 text-xs font-medium bg-amber-500 text-white rounded-md uppercase">
              <FaWeightScale />
              {unit}
            </span>
          </div>

          {/* ----------*** :: CROPS DESC :: ***---------- */}
          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
            {description}
          </p>
          {/* ----------*** :: BOTTOM PART :: ***---------- */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div>
              {/* ----------*** :: CROPS PRICE :: ***---------- */}
              <p className="text-xs uppercase text-gray-500 font-medium">
                PRICE / {unit}
              </p>
              {/* ----------*** :: CROPS PRICE PER UNIT :: ***---------- */}
              <p className="text-4xl font-extrabold text-gray-900">
                {pricePerUnit}
                <span className="text-xl font-semibold text-gray-600">TK</span>
              </p>
            </div>

            {/* ----------*** :: BTN => VIEW DETAILS :: ***---------- */}
            <Link
              to={``}
              className="px-6 py-3 btn-main font-semibold  shadow-md"
              onClick={() => console.log(`View details for ${name}`)}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropsCard;
