import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import CropsCard from "./CropsCard";
import Marquee from "react-fast-marquee";

const LatestCrops = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const data = useLoaderData();
  const [crops] = useState(data);
  const latestSixCrops = crops.slice(0, 6);

  return (
    <section className="py-16">
      {/* ----------*** :: HEADER :: ***---------- */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <span className="text-primary"> Explore </span>{" "}
          <span className="text-secondary"> Our Latest Crops!</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
          Discover the freshest harvests from farmers across the country. Each
          crop is freshly added, quality-assured, and ready for trade. Stay
          ahead with the newest produce in the market — straight from the farm
          to your business.
        </p>
      </div>

      {/* ----------*** :: CROPS DISPLAY :: ***---------- */}
      {latestSixCrops.length > 0 ? (
        <>
          {/* ----------*** :: DISPLAY => SM & MD :: ***---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 md:hidden">
            {latestSixCrops.map((crop) => (
              <CropsCard key={crop._id} crop={crop} />
            ))}
          </div>

          {/* ----------*** :: DISPLAY => LG :: ***---------- */}
          <div className="hidden md:block">
            <Marquee
              speed={50}
              pauseOnHover={true}
              gradient={false}
              className="py-4"
            >
              {crops.map((crop) => (
                <div key={crop._id} className="mr-6">
                  <CropsCard crop={crop} />
                </div>
              ))}
            </Marquee>
          </div>
        </>
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
