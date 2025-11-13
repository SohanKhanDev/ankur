import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvide";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import EditCropModal from "../components/EditCropModal";
import Swal from "sweetalert2";
import ContentLoader from "../components/ContentLoader";

const MyPostsPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { user, contentLoading, setContentLoading } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "MY POSTS | ANKUR";
  }, []);

  /*** ----------*** :: FETCH => MY POSTS :: ***---------- ***/
  useEffect(() => {
    setContentLoading(true);
    fetch(`https://ankur-server-ten.vercel.app/myposts?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setContentLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching posts");
        setContentLoading(false);
      });
  }, [user?.email]);

  /*** ----------*** :: OPEN MODALE :: ***---------- ***/
  const openEditModal = (crop) => {
    setSelectedCrop(crop);
    setEditModalOpen(true);
  };

  /*** ----------*** :: HANDLER => EDIT :: ***---------- ***/
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedCrop = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: parseInt(form.price.value),
      unit: form.unit.value,
      quantity: parseInt(form.quantity.value),
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
    };

    fetch(
      `https://ankur-server-ten.vercel.app/crop/edit?cropid=${selectedCrop._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updatedCrop,
        }),
      }
    )
      .then((res) => res.json())
      .then(() => {})
      .catch(() => toast.error("Error"));

    setCrops((prev) =>
      prev.map((crop) => (crop._id === selectedCrop._id ? updatedCrop : crop))
    );
    toast.success("Crop updated successfully!");
    setEditModalOpen(false);
  };

  /*** ----------*** :: HANDLER => CROP DELETE :: ***---------- ***/
  const handleDelete = (cropId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://ankur-server-ten.vercel.app/crop/delete?cropid=${cropId}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then(() => {
            /*** ----------*** :: HANDLER => CROP DELETE :: ***---------- ***/
            fetch(
              `https://ankur-server-ten.vercel.app/interests/delete?cropid=${cropId}`,
              {
                method: "DELETE",
              }
            )
              .then((res) => res.json())
              .then(() => {})
              .catch(() => toast.error("Error"));

            /*** ----------*** :: UI => INSTANT UPDATE :: ***---------- ***/
            setCrops((prev) => prev.filter((crop) => crop._id !== cropId));
          })
          .catch(() => toast.error("Error"));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
      {/* ---------- HEADER ---------- */}
      <div className="text-center mb-2 md:mb-4 border-b pb-4 md:pb-6 border-gray-100">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-primary">Plant</span>{" "}
          <span className="text-secondary">Your Listing</span>
        </h1>
        <p className="text-gray-600 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-2 text-sm sm:text-base md:text-lg">
          Manage all the crops you have posted. Edit or delete them as needed.
        </p>
      </div>
      {contentLoading ? (
        <ContentLoader />
      ) : (
        <div>
          {crops.length === 0 ? (
            <p className="text-gray-500 text-center text-sm sm:text-base md:text-lg">
              You have no crops posted yet.
            </p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm md:text-base uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3 text-left">Crop</th>
                    <th className="px-4 py-3 text-center">Price</th>
                    <th className="px-4 py-3 text-center">Quantity</th>
                    <th className="px-4 py-3 text-center hidden lg:table-cell">
                      Location
                    </th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {crops.map((crop) => (
                    <tr key={crop._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={crop.image}
                            alt={crop.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/100x100/f3f4f6/374151?text=No+Image";
                            }}
                          />
                          <div>
                            <p className="font-semibold text-sm sm:text-base">
                              {crop.name}
                            </p>
                            <p className="text-gray-500 text-xs sm:text-sm">
                              {crop.type}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-center text-sm sm:text-base">
                        ৳{crop.pricePerUnit}
                      </td>
                      <td className="px-4 py-3 text-center text-sm sm:text-base">
                        {crop.quantity} {crop.unit}
                      </td>

                      {/* Location only visible on lg */}
                      <td className="px-4 py-3 text-center text-sm sm:text-base hidden lg:table-cell">
                        {crop.location}
                      </td>

                      <td className="py-3 text-center">
                        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4">
                          <button
                            onClick={() => openEditModal(crop)}
                            className="btn btn-main rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3"
                            title="Edit"
                          >
                            <FaEdit className="text-xs sm:text-sm md:text-base lg:text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(crop._id)}
                            className="btn btn-delete rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3"
                            title="Delete"
                          >
                            <FaTrash className="text-xs sm:text-sm md:text-base lg:text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ---------- EDIT MODAL ---------- */}
      {editModalOpen && selectedCrop && (
        <EditCropModal
          selectedCrop={selectedCrop}
          setEditModalOpen={setEditModalOpen}
          handleEditSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default MyPostsPage;
