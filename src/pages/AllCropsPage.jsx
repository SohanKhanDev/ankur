import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import CropsCard from "../components/CropsCard";
import { toast } from "react-toastify";

const AllCropsPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const data = useLoaderData();
  const [crops, setCrops] = useState(data);

  /*** ----------*** :: HANDLER => SEARCH  :: ***---------- ***/
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;

    fetch(`http://ankur-server-ten.vercel.app/cropsSearch?search=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
      })
      .catch(() => {
        toast.error(`Search failed`);
      });
  };

  /*** ----------*** :: TITLE SETUP :: ***---------- ***/
  useEffect(() => {
    document.title = "ALL CROPS | ANKUR";
  }, []);

  return (
    <div className="px-4 min-h-screen">
      {/* ----------*** :: SEARCH BAR :: ***---------- */}
      <div className="flex justify-center my-12">
        <div className="w-full max-w-xl">
          <form
            onSubmit={handleSearch}
            className="flex items-center h-12 border border-gray-300 bg-white rounded-full shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition duration-200"
          >
            <input
              name="search"
              type="search"
              placeholder="Search by crops name"
              className="w-full h-full p-4 pr-1 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="h-full px-5 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition duration-150"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* ----------*** :: MAPPING => CROPS :: ***---------- */}
      {crops.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-data-not-found-icon-svg-download-png-1662569.png"
            alt="No crops found"
            className="w-32 h-32 mb-4 opacity-80"
          />
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">
            No Crops Found
          </h1>
          <p className="text-gray-500">
            It looks like there are no crops available right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-3 lg:gap-6">
          {crops.map((crop) => (
            <CropsCard crop={crop} key={crop._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCropsPage;
