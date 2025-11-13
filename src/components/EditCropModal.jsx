import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const EditCropModal = ({
  selectedCrop,
  setEditModalOpen,
  handleEditSubmit,
}) => {
  /*** ---------- HOOKS ---------- ***/
  const [units, setUnits] = useState([]);
  const [cropTypes, setCropTypes] = useState([]);

  /*** ---------- FETCH UNITS ---------- ***/
  useEffect(() => {
    fetch(`https://ankur-server-ten.vercel.app/units`)
      .then((res) => res.json())
      .then((data) => setUnits(data));
  }, []);

  /*** ---------- FETCH CROP TYPES ---------- ***/
  useEffect(() => {
    fetch(`https://ankur-server-ten.vercel.app/crop-type`)
      .then((res) => res.json())
      .then((data) => setCropTypes(data));
  }, []);

  if (!selectedCrop) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 relative overflow-y-auto max-h-[90vh] border border-gray-100">
        {/* ---------- CLOSE BUTTON ---------- */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setEditModalOpen(false)}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* ---------- HEADER ---------- */}
        <div className="text-center mb-4 border-b pb-4 border-gray-100">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Edit <span className="text-primary">Crop</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Update crop information below.
          </p>
        </div>

        {/* ---------- FORM ---------- */}
        <form onSubmit={handleEditSubmit} className="space-y-8">
          <section className="p-5 bg-green-50/50 rounded-2xl border space-y-7 border-green-100">
            {/* Name + Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                  Crop Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedCrop.name}
                  className="inputClass w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                  Crop Type
                </label>
                <select
                  name="type"
                  value={selectedCrop.type}
                  className="selectClass w-full"
                  required
                >
                  {cropTypes.map((type) => (
                    <option key={type._id} value={type.type}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                  Price per Unit (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  value={selectedCrop.pricePerUnit}
                  className="inputClass w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  name="unit"
                  defaultValue={selectedCrop.unit}
                  className="selectClass w-full"
                  required
                >
                  {units.map((unit) => (
                    <option key={unit._id} value={unit.unit}>
                      {unit.unit}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                  Estimated Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={selectedCrop.quantity}
                  className="inputClass w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  defaultValue={selectedCrop.description}
                  className="inputClass w-full resize-y md:resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                    Farm/Storage Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedCrop.location}
                    className="inputClass w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                    Crop Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={selectedCrop.image}
                    className="inputClass w-full"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ---------- BTN => UPDATE ---------- */}
          <button
            type="submit"
            className="w-full btn btn-main text-sm sm:text-base md:text-lg py-2 sm:py-3"
          >
            Update Crop
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCropModal;
