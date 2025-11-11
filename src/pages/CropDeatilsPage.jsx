import React, { use, useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  FaBox,
  FaDollarSign,
  FaEnvelope,
  FaWeightHanging,
  FaCheckCircle,
} from "react-icons/fa";
import { useLoaderData } from "react-router";
import { AuthContext } from "../providers/AuthProvide";
import { toast } from "react-toastify";

const CropDetailsPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const data = useLoaderData();

  const [crop, setCrop] = useState(data);
  const { _id, description, image, name, pricePerUnit, quantity, type, unit } =
    crop;

  const { user, actionLoading, setActionLoading } = use(AuthContext);

  const [interestQuantity, setInterestQuantity] = useState(1);
  const [interestMessage, setInterestMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  /*** ----------*** :: VALIDATION => INTEREST  :: ***---------- ***/
  useEffect(() => {
    if (user?.email && crop?.interests?.length > 0) {
      const alreadyInterested = crop.interests.some(
        (interest) => interest.userEmail === user.email
      );
      if (alreadyInterested) {
        setIsSubmitted(true);
      }
    }
  }, [user, crop]);

  /*** ----------*** :: CALCULATION => TOTAL PRICE  :: ***---------- ***/
  const totalPrice = (interestQuantity * pricePerUnit).toFixed(2);

  /*** ----------*** :: HANDLER => SUBMIT INTEREST  :: ***---------- ***/
  const handleSubmitInterest = (e) => {
    e.preventDefault();
    setActionLoading(true);
    setIsSubmitted(false);

    /*** ----------*** :: VALIDATION => INTERESTED QTY  :: ***---------- ***/
    if (quantity < interestQuantity) {
      return toast.error("Interest Qty is Higher then Stock Qty");
    }

    /*** ----------*** :: DATABASE => POST => INTEREST  :: ***---------- ***/
    const newInterest = {
      cropId: _id,
      userEmail: user.email,
      userName: user.displayName,
      quantity: interestQuantity,
      message: interestMessage,
      totalPrice,
    };

    fetch(`http://localhost:3000/interests/${_id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newInterest),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after insert:", data);
        if (data.acknowledged) {
          toast.success("Interest Submitted!! 🎉");
          const addedInterest = {
            ...newInterest,
            _id: data.insertedId,
            status: "Pending",
          };

          setCrop((prev) => ({
            ...prev,
            interests: [...(prev.interests || []), addedInterest],
          }));
          setIsSubmitted(true);
        }
      });
    setActionLoading(false);
  };

  /*** ----------*** :: HANDLER => INTEREST ACCEPT  :: ***---------- ***/
  const handleInterestAccept = (interestId) => {
    const interest = crop.interests.find(
      (interest) => interest._id === interestId
    );
    if (quantity < interest.quantity) {
      return toast.error(`Insufficient Stock!!`);
    }

    fetch(`http://localhost:3000/interests/accept?interestId=${interestId}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Interest accepted:", data);

        setCrop((prevCrop) => ({
          ...prevCrop,
          // update stock
          quantity: prevCrop.quantity - interest.quantity,
          // update interest status
          interests: prevCrop.interests.map((prev) =>
            prev._id === interestId ? { ...prev, status: "Accepted" } : prev
          ),
        }));
      })
      .catch((error) => console.error("Error:", error));
  };

  /*** ----------*** :: HANDLER => INTEREST REJECT  :: ***---------- ***/
  const handleInterestReject = (interestId) => {
    fetch(`http://localhost:3000/interests/reject?interestId=${interestId}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Interest rejected:", data);

        setCrop((prevCrop) => ({
          ...prevCrop,
          interests: prevCrop.interests.map((prev) =>
            prev._id === interestId ? { ...prev, status: "Rejected" } : prev
          ),
        }));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen p-8 font-sans">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-xl p-8 md:p-12">
        {/* ----------*** :: CROPS & INTEREST (TOP PART) :: ***---------- */}
        <div className="border-b border-black pb-9">
          {/* ----------*** :: CROP NAME :: ***---------- */}
          <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
            <h1 className="text-4xl font-extrabold text-[#d35507] capitalize">
              {name}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-30">
            {/* ----------*** :: LEFT SIDE :: ***---------- */}
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Overview
                </h2>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            </div>

            {/* ----------*** :: RIGHT SIDE :: ***---------- */}
            <div className="lg:col-span-2 h-full  bg-white p-6 shadow-xl rounded-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-[#d35507] ">
                Express Your Interest
              </h2>

              {isSubmitted ? (
                <div className=" mt-7 relative overflow-hidden p-5 mb-5 bg-linear-to-r from-green-50 to-green-100 border border-green-300 rounded-2xl shadow-md flex items-center gap-4 animate-fadeIn">
                  <div className="shrink-0 ">
                    <FaCheckCircle
                      className="text-green-500 drop-shadow-md"
                      size={26}
                    />
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-green-700 tracking-wide">
                      🎉 Interest submitted successfully!
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      We’ve notified the seller about your request. You’ll be
                      contacted soon.
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-green-400 to-emerald-500 animate-slideRight"></div>
                </div>
              ) : (
                <form onSubmit={handleSubmitInterest} className="space-y-5">
                  {/* ----------*** :: INPUT => Qty :: ***---------- */}
                  <div>
                    <label className="label">
                      <span className="label-text flex items-center gap-2 text-base font-medium text-gray-700">
                        <FaWeightHanging /> Required Quantity ({unit})
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder={`Enter quantity in ${unit}`}
                      value={interestQuantity}
                      onChange={(e) =>
                        setInterestQuantity(
                          Math.max(1, parseInt(e.target.value) || 0)
                        )
                      }
                      min="1"
                      required
                      className="input input-bordered w-full text-lg p-3 border border-gray-300 focus:border-[#d35507] transition duration-150"
                    />
                  </div>

                  {/* ----------*** :: INPUT => MESSAGE :: ***---------- */}
                  <div>
                    <label className="label">
                      <span className="label-text flex items-center gap-2 text-base font-medium text-gray-700">
                        <FaEnvelope /> Message to Seller (Optional)
                      </span>
                    </label>
                    <textarea
                      placeholder="E.g., I need delivery ASAP or discuss pricing."
                      value={interestMessage}
                      onChange={(e) => setInterestMessage(e.target.value)}
                      className="textarea textarea-bordered h-24 w-full p-3 border border-gray-300 focus:border-[#d35507] transition duration-150"
                    ></textarea>
                  </div>

                  {/* ----------*** :: TOATAL PRICE :: ***---------- */}
                  <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <span className="text-lg font-bold text-gray-700 flex items-center gap-2">
                      <FaDollarSign className="text-[#d35507]" /> Estimated
                      Total
                    </span>
                    <span className="text-3xl font-extrabold text-[#d35507]">
                      {totalPrice} TK
                    </span>
                  </div>

                  {/* ----------*** :: BTN => SUBMIT :: ***---------- */}
                  <button
                    type="submit"
                    className={`w-full btn-main text-lg py-3 mt-4 ${
                      actionLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Submitting..." : "Submit Interest"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ----------*** :: EXISTING INTERESTS (MIDDLE PART) :: ***---------- */}
        <div>
          <div className="border-t pt-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Interests List
            </h2>

            {/* ----------*** :: TABULAR => INTEREST LIST :: ***---------- */}
            <div className="overflow-x-auto">
              <table className="table">
                {/* ----------*** :: TABLE => HEADER :: ***---------- */}
                <thead className="text-center">
                  <tr>
                    <th>Buyer Name</th>
                    <th>Quantity</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {/* ----------*** :: TABLE => BODY :: ***---------- */}
                <tbody className="text-center">
                  {crop?.interests && crop.interests.length > 0 ? (
                    crop.interests.map((interest, index) => (
                      <tr key={index}>
                        {/* ----------*** :: BUYER INFO:: ***---------- */}
                        <td>
                          <div className="flex items-center gap-3 uppercase">
                            <div className="font-bold">{interest.userName}</div>
                          </div>
                        </td>

                        {/* ----------*** :: QTY:: ***---------- */}
                        <td>
                          <span className="font-semibold text-gray-800 uppercase">
                            {interest.quantity} {crop.unit}
                          </span>
                        </td>

                        {/* ----------*** :: MESSAGE:: ***---------- */}
                        <td className="text-gray-600 italic">
                          {interest.message || "—"}
                        </td>

                        {/* ----------*** :: STATUS:: ***---------- */}
                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              interest.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : interest.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {interest.status}
                          </span>
                        </td>

                        {/* --- Action --- */}
                        <td className="">
                          {interest.status === "Pending" ? (
                            <div className="flex gap-2  justify-center">
                              <button
                                onClick={() =>
                                  handleInterestAccept(interest._id)
                                }
                                className="btn btn-xs bg-green-600 text-white hover:bg-green-700"
                              >
                                Accept
                              </button>

                              <button
                                onClick={() =>
                                  handleInterestReject(interest._id)
                                }
                                className="btn btn-xs bg-red-600 text-white hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm italic">
                              No Action
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500"
                      >
                        No interests submitted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetailsPage;
