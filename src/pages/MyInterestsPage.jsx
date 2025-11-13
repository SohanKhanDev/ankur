import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvide";
import { Link } from "react-router";

const MyInterestsPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);

  /*** ----------*** :: FETCH => MY INTERESTS :: ***---------- ***/
  useEffect(() => {
    fetch(`http://ankur-server-ten.vercel.app/myinterests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setInterests(data))
      .catch((err) => console.error("Error fetching interests:", err));
  }, [user]);

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "MY INTEREST | ANKUR";
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 bg-gray-50">
      {/* ----------*** :: TITLE :: ***---------- */}
      <div className="text-center mb-8 md:mb-12 border-b pb-4 md:pb-6 border-gray-100">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-primary">My</span>{" "}
          <span className="text-secondary">Interests</span>
        </h1>
        <p className="text-gray-600 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-2 text-sm sm:text-base md:text-lg">
          Track the status of all the interests you've sent to crop owners and
          manage your connections effectively.
        </p>
      </div>

      {interests.length === 0 ? (
        <p className="text-gray-500 text-center text-sm sm:text-base md:text-lg">
          You haven't sent any interests yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm md:text-base uppercase font-semibold text-center">
              <tr>
                <th className="px-4 py-3">Crop</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Quantity</th>

                <th className="px-4 py-3 hidden lg:table-cell">Message</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-gray-700 text-center">
              {[...interests]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((interest) => (
                  <tr
                    key={interest._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to={`/crops/${interest._id}`}
                        className="flex flex-col items-center gap-2"
                      >
                        <img
                          src={interest.image}
                          alt={interest.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
                          }}
                        />
                        <p className="font-semibold text-sm sm:text-base">
                          {interest.name}
                        </p>
                      </Link>
                    </td>

                    <td className="px-4 py-3 text-sm sm:text-base">
                      {interest.owner.ownerName}
                    </td>
                    <td className="px-4 py-3 text-sm sm:text-base">
                      {interest.quantity} {interest.unit}
                    </td>

                    <td className="px-4 py-3 text-sm sm:text-base whitespace-normal wrap-break-word max-w-[150px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[500px] hidden lg:table-cell">
                      {interest.interests[0].message}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm md:text-base font-medium ${
                          interest.interests[0].status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : interest.interests[0].status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {interest.interests[0].status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyInterestsPage;
