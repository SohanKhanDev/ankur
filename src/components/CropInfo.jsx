import React from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBox } from "react-icons/fa";

const CropInfoSection = ({
  name,
  image,
  type,
  quantity,
  unit,
  pricePerUnit,
  description,
}) => {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* ----------*** :: CROP PHOTO :: ***---------- */}
      <div className="relative h-60 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/f3f4f6/374151?text=Product+Image";
          }}
        />
      </div>

      {/* ----------*** :: CROP INFO TAGS :: ***---------- */}
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg uppercase">
          <BiSolidCategoryAlt size={15} /> {type}
        </span>
        <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg uppercase">
          <FaBox /> STOCK: {quantity} {unit}
        </span>
        <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-amber-500 text-white rounded-lg uppercase">
          <FaBox size={15} /> Unit: {unit}
        </span>
        <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple-500 text-white rounded-lg uppercase">
          <FaBox size={15} /> Price: {pricePerUnit}
        </span>
      </div>

      {/* ----------*** :: CROP DESC :: ***---------- */}
      <div className="border-t pt-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Overview</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default CropInfoSection;
