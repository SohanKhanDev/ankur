import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const EditCropModal = ({
  selectedCrop,
  setEditModalOpen,
  handleEditSubmit,
}) => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const [units, setUnits] = useState([]);
  const [cropTypes, setCropstypes] = useState([]);

  /*** ----------*** :: UNITS FETCH ***---------- ***/
  useEffect(() => {
    fetch(`http://localhost:3000/units`)
      .then((res) => res.json())
      .then((data) => setUnits(data));
  }, []);

  /*** ----------*** :: CROP TYPES FETCH ***---------- ***/
  useEffect(() => {
    fetch(`http://localhost:3000/crop-type`)
      .then((res) => res.json())
      .then((data) => setCropstypes(data));
  }, []);
  if (!selectedCrop) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 md:p-12 relative overflow-hidden transform transition-all duration-500 hover:shadow-3xl border border-gray-100">
        {/* ----------*** :: BTN => CLOSED :: ***---------- */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setEditModalOpen(false)}
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="text-center mb-4 border-b pb-4 border-gray-100">
          <h2 className="text-3xl font-bold mb-2">
            Edit <span className="text-primary">Crop</span>
          </h2>
          <p className="text-gray-600">Update crop information below.</p>
        </div>

        <form onSubmit={handleEditSubmit} className="space-y-8">
          <section className="p-5 bg-green-50/50 rounded-2xl border space-y-7 border-green-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Crop Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedCrop.name}
                  className="inputClass"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Crop Type
                </label>
                <select
                  name="type"
                  defaultValue={selectedCrop.type}
                  className="selectClass"
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Price per Unit (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedCrop.pricePerUnit}
                  className="inputClass"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  name="unit"
                  defaultValue={selectedCrop.unit}
                  className="selectClass"
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Estimated Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={selectedCrop.quantity}
                  className="inputClass"
                  required
                />
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  defaultValue={selectedCrop.description}
                  className="inputClass resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Farm/Storage Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedCrop.location}
                    className="inputClass"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Crop Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={selectedCrop.image}
                    className="inputClass"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <button type="submit" className="w-full btn btn-main">
            Update Crop
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCropModal;
