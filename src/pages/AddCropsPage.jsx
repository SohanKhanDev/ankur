import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvide";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";

const AddCropsPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const [units, setUnits] = useState([]);
  const [cropstypes, setCropstypes] = useState([]);
  const { user, actionLoading, setActionLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  /*** ----------*** :: DB FETCH => UNITS :: ***---------- ***/
  useEffect(() => {
    fetch(`http://localhost:3000/units`)
      .then((res) => res.json())
      .then((data) => {
        setUnits(data);
      });
  }, []);

  /*** ----------*** :: DB FETCH => CROP TYPES :: ***---------- ***/
  useEffect(() => {
    fetch(`http://localhost:3000/crop-type`)
      .then((res) => res.json())
      .then((data) => {
        setCropstypes(data);
      });
  }, []);

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "ADD CROP | ANKUR";
  }, []);

  const handleAddCrop = (e) => {
    e.preventDefault();
    setActionLoading(true);

    const form = e.target;
    const cropData = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: parseInt(form.price.value),
      unit: form.unit.value,
      quantity: parseInt(form.quantity.value),
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
      owner: {
        ownerName: user?.displayName,
        ownerEmail: user?.email,
      },
      createdAt: new Date(),
    };

    fetch("http://localhost:3000/addcrop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cropData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("🌾 Crop posted successfully!");
        form.reset();
        navigate("/myposts");
      })
      .catch(() => toast.error("❌ Failed to add crop. Please try again."))
      .finally(() => setActionLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 md:p-12 relative overflow-hidden transform transition-all duration-500 hover:shadow-3xl border border-gray-100">
        {/* ----------*** :: HEADER :: ***---------- */}
        <div className="text-center mb-10 border-b pb-5 border-gray-100">
          <img
            src={logo}
            alt="Ankur Logo"
            className="w-24 mx-auto mb-3 opacity-90"
          />

          <h1 className="text-4xl sm:text-5xl font-bold  mb-4">
            <span className="text-primary">Plant</span>{" "}
            <span className="text-secondary">Your Listing</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2">
            Help buyers find your crop easily. All fields are required.
          </p>
        </div>

        {/* ----------*** :: FORM :: ***---------- */}
        <form onSubmit={handleAddCrop} className="space-y-8">
          <section className="p-5 bg-green-50/50 rounded-2xl border border-green-100">
            <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
              <span className="mr-2 text-2xl text-primary">🌱</span>
              Essential Crop Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* ----------*** :: CROPS NAME :: ***---------- */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Crop Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g., Rice (Miniket)"
                  className="inputClass"
                  required
                />
              </div>

              {/* ----------*** :: CROPS TYPE :: ***---------- */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Crop Type
                </label>
                <select id="type" name="type" className="selectClass" required>
                  <option value="">Select type</option>
                  {cropstypes.map((type) => (
                    <option key={type._id} value={type.type}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
              <span className="mr-2 text-2xl text-primary">💰</span>
              Pricing and Volume
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* ----------*** :: CROPS UNIT PRICE :: ***---------- */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Price per Unit (৳)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="1"
                  min="1"
                  placeholder="e.g., 60"
                  className="inputClass"
                  required
                />
              </div>

              {/* ----------*** ::UNIT :: ***---------- */}
              <div>
                <label
                  htmlFor="unit"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Unit
                </label>
                <select id="unit" name="unit" className="selectClass" required>
                  <option value="">Select unit</option>
                  {units.map((unit) => (
                    <option key={unit._id} value={unit.unit}>
                      {unit.unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* ----------*** ::QTY :: ***---------- */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Estimated Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  placeholder="e.g., 2000"
                  className="inputClass"
                  required
                />
              </div>
            </div>
          </section>

          <section className="p-5 bg-yellow-50/50 rounded-2xl border border-yellow-100">
            <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
              <span className="mr-2 text-2xl text-primary">🖼️</span>
              Description and Location
            </h3>
            <div className="space-y-5">
              {/* ----------*** ::DESCRIPTION :: ***---------- */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Detailed Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Short details about your crop, quality, harvest date, etc."
                  className={`inputClass resize-none`}
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ----------*** ::LOCATION :: ***---------- */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Farm/Storage Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="e.g., Dhaka"
                    className="inputClass"
                    required
                  />
                </div>

                {/* ----------*** ::IMAGE URL :: ***---------- */}
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Crop Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Paste the crop photo URL"
                    className="inputClass"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ----------*** :: BTN => SUMIT :: ***---------- */}
          <button
            type="submit"
            disabled={actionLoading}
            className="w-full btn btn-main"
          >
            {actionLoading ? "Posting Crop..." : "POST CROP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCropsPage;
