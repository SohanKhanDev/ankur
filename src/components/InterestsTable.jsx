import React from "react";

const InterestsTable = ({
  interests,
  cropUnit,
  handleInterestAccept,
  handleInterestReject,
  isOwner,
}) => {
  return (
    isOwner && (
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
              {interests && interests.length > 0 ? (
                interests.map((interest, index) => (
                  <tr key={index}>
                    {/* ----------*** :: BUYER INFO:: ***---------- */}
                    <td>
                      <div className="flex items-center gap-3 uppercase justify-center">
                        <div className="font-bold">{interest.userName}</div>
                      </div>
                    </td>

                    {/* ----------*** :: QTY:: ***---------- */}
                    <td>
                      <span className="font-semibold text-gray-800 uppercase">
                        {interest.quantity} {cropUnit}
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
                    {/* ----------*** :: BTN => ACTION :: ***---------- */}
                    {/* --- Action --- */}
                    <td className="">
                      {interest.status === "Pending" ? (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleInterestAccept(interest._id)}
                            className="btn btn-xs bg-green-600 text-white hover:bg-green-700"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => handleInterestReject(interest._id)}
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
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No interests submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default InterestsTable;
