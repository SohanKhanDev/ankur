import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvide";

const MyInterestsPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);

  /*** ----------*** :: FETCH => MY POSTS :: ***---------- ***/
  useEffect(() => {
    fetch(`http://localhost:3000/myinterests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setInterests(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, [user]);
  console.log(interests);

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50">
      <div className="text-center mb-10 border-b pb-5 border-gray-100">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="text-primary">My</span>{" "}
          <span className="text-secondary">Interests</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-2">
          Track the status of all the interests you’ve sent to crop owners and
          manage your connections effectively.
        </p>
      </div>

      {interests.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven't sent any interests yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="px-4 py-3 text-center">Photo</th>
                <th className="px-4 py-3 text-center">Crop Name</th>
                <th className="px-4 py-3 text-center">Owner</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-center">Message</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-gray-700">
              {interests.map((interest) => (
                <tr key={interest._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <img
                      src={interest.image}
                      className="w-25 h-25 object-cover rounded-xl"
                    />
                  </td>
                  <td className="px-4 py-3">{interest.name}</td>
                  <td className="px-4 py-3">{interest.owner.ownerName}</td>
                  <td className="px-4 py-3">
                    {interest.quantity} {interest.unit}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">
                    {interest.interests[0].message}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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
