import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvide";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import EditCropModal from "../components/EditCropModal";
import Swal from "sweetalert2";

const MyPostsPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const { user } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  /*** ----------*** :: FETCH => MY POSTS :: ***---------- ***/
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/myposts?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setCrops(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, [user]);

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
    console.log(updatedCrop);

    fetch(`http://localhost:3000/crop/edit?cropid=${selectedCrop._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updatedCrop,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Crops updated:", data);
      })
      .catch((error) => console.error("Error:", error));

    setCrops((prev) =>
      prev.map((crop) => (crop._id === selectedCrop._id ? updatedCrop : crop))
    );
    toast.success("Crop updated successfully!");
    setEditModalOpen(false);
  };

  /*** ----------*** :: HANDLER => DELETE :: ***---------- ***/
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
        fetch(`http://localhost:3000/crop/delete?cropid=${cropId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Crops deleted:", data);

            setCrops((prev) => prev.filter((crop) => crop._id !== cropId));
          })
          .catch((error) => console.error("Error:", error));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50">
      {/* ---------- HEADER ---------- */}
      <div className="text-center mb-10 border-b pb-5 border-gray-100">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="text-primary">Plant</span>{" "}
          <span className="text-secondary">Your Listing</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-2">
          Manage all the crops you have posted. Edit or delete them as needed.
        </p>
      </div>

      {crops.length === 0 ? (
        <p className="text-gray-500 text-center">
          You have no crops posted yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-gray-700">
              {crops.map((crop) => (
                <tr key={crop._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </td>
                  <td className="px-4 py-3">{crop.name}</td>
                  <td className="px-4 py-3">{crop.type}</td>
                  <td className="px-4 py-3">৳{crop.pricePerUnit}</td>
                  <td className="px-4 py-3">
                    {crop.quantity} {crop.unit}
                  </td>
                  <td className="px-4 py-3">{crop.location}</td>
                  <td className="px-4 py-3">
                    {crop.description.length > 50
                      ? crop.description.substring(0, 50) + "..."
                      : crop.description}
                  </td>

                  <td className="py-3 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => openEditModal(crop)}
                        className="btn btn-main rounded-lg"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(crop._id)}
                        className="btn btn-delete  rounded-lg"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
