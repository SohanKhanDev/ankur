import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import CropsCard from "./CropsCard";
import { FaArrowRight } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const LatestCrops = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const data = useLoaderData();
  const [crops] = useState(data);
  const latestSixCrops = crops.slice(0, 6);

  return (
    <section className="py-16  hidden md:block">
      {/* ----------*** :: HEADER :: ***---------- */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="text-primary"> Explore </span>{" "}
          <span className="text-secondary"> Our Latest Crops!</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover the freshest harvests from farmers across the country. Each
          crop is freshly added, quality-assured, and ready for trade. Stay
          ahead with the newest produce in the market — straight from the farm
          to your business.
        </p>
      </div>

      {/* ----------*** :: MAPPING => LATEST CROPS :: ***---------- */}
      {latestSixCrops.length > 0 ? (
        <Marquee
          speed={50} // Adjust speed (pixels/second)
          pauseOnHover={true} // Pause when the user hovers over it
          gradient={false} // Set to true to add a fade effect at the edges
          className="py-4" // Add some vertical padding for visual separation
        >
          {/* The Marquee content needs proper spacing between items. 
                        We add margin-right to the card wrapper inside the map. */}
          {crops.map((crop) => (
            <div key={crop._id} className="mr-6">
              <CropsCard crop={crop} />
            </div>
          ))}
        </Marquee>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-xl text-gray-600 font-medium">
            🌱 No crop posts available yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default LatestCrops;
