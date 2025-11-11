import React from "react";
import {
  FaDollarSign,
  FaEnvelope,
  FaWeightHanging,
  FaCheckCircle,
} from "react-icons/fa";

const ExpressInterest = ({
  isOwner,
  isSubmitted,
  handleSubmitInterest,
  interestQuantity,
  setInterestQuantity,
  interestMessage,
  setInterestMessage,
  totalPrice,
  unit,
  actionLoading,
}) => {
  return (
    <div className="lg:col-span-2 h-full bg-white p-6 shadow-xl rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-[#d35507]">
        Express Your Interest
      </h2>

      {isOwner ? (
        <div className="mt-7 relative overflow-hidden p-5 mb-5 bg-orange-50 border border-orange-300 rounded-2xl shadow-md flex items-center gap-4 animate-fadeIn">
          <div className="shrink-0">
            <FaCheckCircle
              className="text-orange-500 drop-shadow-md"
              size={26}
            />
          </div>

          <div>
            <p className="text-lg font-semibold text-orange-700 tracking-wide">
              🧑‍🌾 You are the owner of this product!
            </p>
            <p className="text-sm text-orange-600 mt-1">
              You can view and manage all buyer interests below.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-orange-400 to-amber-500 animate-slideRight"></div>
        </div>
      ) : isSubmitted ? (
        // 👉 If interest is already submitted by the user
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
              We’ve notified the seller about your request. You’ll be contacted
              soon.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-green-400 to-emerald-500 animate-slideRight"></div>
        </div>
      ) : (
        // 👉 Interest submission form
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
                setInterestQuantity(Math.max(1, parseInt(e.target.value) || 0))
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
              <FaDollarSign className="text-[#d35507]" /> Estimated Total
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
  );
};

export default ExpressInterest;
