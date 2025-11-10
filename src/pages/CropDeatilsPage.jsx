import React, { useState } from "react";

// Reusing the inline SVG definitions for consistency and to avoid external package imports.
// --- Inline SVG Icon Definitions ---
const CategoryIcon = ({ size = 20, className = "text-gray-500" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="9" rx="1" ry="1"></rect>
    <rect x="14" y="3" width="7" height="5" rx="1" ry="1"></rect>
    <rect x="14" y="12" width="7" height="9" rx="1" ry="1"></rect>
    <rect x="3" y="16" width="7" height="5" rx="1" ry="1"></rect>
  </svg>
);

const BoxIcon = ({ size = 20, className = "text-white" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.68 18.25L21 14.12V5.88L12.68 1.75L4.36 5.88V14.12L12.68 18.25Z"></path>
    <line x1="4.36" y1="5.88" x2="12.68" y2="10.01"></line>
    <line x1="12.68" y1="10.01" x2="21" y2="5.88"></line>
    <line x1="12.68" y1="10.01" x2="12.68" y2="18.25"></line>
  </svg>
);

const UnitIcon = ({ size = 20, className = "text-white" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="2" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
    <line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line>
  </svg>
);

// Mock data structure, reflecting the props from CropsCard
const MOCK_CROP_DATA = {
  name: "Red Onion",
  description:
    "These are large, freshly harvested red onions known for their pungent aroma and sharp flavor. Ideal for salads, grilling, and deep frying. Organically grown on sustainable farms.",
  longDescription:
    "Sourced from the fertile lands of Jessore, our Red Onions are hand-picked at peak maturity to ensure maximum shelf life and flavor. They offer excellent nutritional value, rich in Vitamin C and Sulphur compounds. Store in a cool, dry place.",
  image: "https://placehold.co/600x400/fff/374151?text=Product+Image", // Placeholder image
  pricePerUnit: "85",
  quantity: "420", // Available stock
  type: "Vegetable",
  unit: "KG",
  details: [
    { label: "Origin", value: "Local Farm" },
    { label: "Shelf Life", value: "3 Weeks" },
    { label: "Best Season", value: "Winter" },
  ],
};

const CropDeatilsPage = ({ initialCrop = MOCK_CROP_DATA }) => {
  const [crop] = useState(initialCrop);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Convert price to number and format
  const price = parseFloat(crop.pricePerUnit);
  const formattedPrice = price.toFixed(0);
  const totalPrice = (price * selectedQuantity).toFixed(0);

  const handleQuantityChange = (change) => {
    setSelectedQuantity((prev) => {
      const newQty = prev + change;
      return newQty > 0 ? newQty : 1; // Prevent quantity from going below 1
    });
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen p-8 font-sans">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl p-8 md:p-12">
        <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 capitalize">
            {crop.name} Details
          </h1>
        </div>

        {/* Main Content Grid: Image (Left) & Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Column */}
          <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <img
              src={crop.image}
              alt={crop.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/f3f4f6/374151?text=Product+Image";
              }}
            />
          </div>

          {/* Details Column */}
          <div>
            {/* Tags / Quick Info */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg capitalize">
                <CategoryIcon size={20} className="text-gray-600" /> {crop.type}
              </span>
              <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg">
                <BoxIcon size={20} className="text-white" /> Stock:{" "}
                {crop.quantity}
              </span>
              <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-amber-500 text-white rounded-lg uppercase">
                <UnitIcon size={20} className="text-white" /> Unit: {crop.unit}
              </span>
            </div>

            {/* Description */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Overview
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed border-b pb-6 border-gray-100">
              {crop.description}
            </p>

            {/* Price and Quantity Selector */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-extrabold text-gray-900">
                  {formattedPrice}
                </p>
                <p className="text-xl font-semibold text-gray-500">
                  TK / {crop.unit.toUpperCase()}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  className="px-4 py-2 text-xl font-medium bg-gray-100 hover:bg-gray-200 transition duration-150"
                  onClick={() => handleQuantityChange(-1)}
                >
                  −
                </button>
                <span className="px-5 py-2 text-lg font-bold text-gray-800 w-16 text-center">
                  {selectedQuantity}
                </span>
                <button
                  className="px-4 py-2 text-xl font-medium bg-gray-100 hover:bg-gray-200 transition duration-150"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action and Total Price */}
            <div className="flex flex-col gap-4">
              <button
                className="w-full py-4 bg-orange-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-orange-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
                onClick={() =>
                  console.log(
                    `Added ${selectedQuantity} ${crop.unit} of ${crop.name} to cart`
                  )
                }
              >
                Add to Cart
              </button>
              <p className="text-center text-sm text-gray-600">
                Total:{" "}
                <span className="text-lg font-bold text-gray-800">
                  {totalPrice} TK
                </span>{" "}
                for {selectedQuantity} {crop.unit}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Details Section (Full Width) */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Detailed Information
          </h2>

          {/* Key Specifications Table/List */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {crop.details.map((detail, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs uppercase text-gray-500 font-medium mb-1">
                  {detail.label}
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          {/* Long Description */}
          <p className="text-gray-700 leading-loose">{crop.longDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default CropDeatilsPage;
