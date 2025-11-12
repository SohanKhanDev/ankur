import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import CropsCard from "./CropsCard";
import Marquee from "react-fast-marquee";
import LaterstCropCard from "./LaterstCropCard";

const LatestCrops = () => {
  const data = useLoaderData();
  const [crops] = useState(data);
  const latestSixCrops = crops.slice(0, 8);

  return (
    <section className="my-16 container mx-auto px-3 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6 sm:mb-8 md:mb-10 text-center md:text-left">
        <div className="md:w-1/3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            <span className="text-primary"> Explore </span>
            <span className="text-secondary"> Our Latest Crops!</span>
          </h2>
        </div>

        <div className="md:w-1/2">
          <p className="text-gray-600 max-w-2xl mx-auto md:mx-0 mb-6 md:mb-0 text-sm sm:text-base md:text-lg leading-relaxed">
            Discover the freshest harvests from farmers across the country. Each
            crop is freshly added, quality-assured, and ready for trade. Stay
            ahead with the newest produce in the market — straight from the farm
            to your business.
          </p>
        </div>
      </div>

      {/* Crops Display */}
      {latestSixCrops.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:hidden">
            {latestSixCrops.map((crop) => (
              <CropsCard key={crop._id} crop={crop} />
            ))}
          </div>

          {/* Optional Marquee */}
          <div className="hidden md:block">
            <Marquee speed={50} pauseOnHover gradient={false} className="py-6">
              <div className="flex gap-6">
                {latestSixCrops.map((crop) => (
                  <div
                    key={crop._id}
                    className="w-[300px] sm:w-[350px] shrink-0"
                  >
                    <LaterstCropCard crop={crop} />
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </>
      ) : (
        <div className="text-center py-12 sm:py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 font-medium">
            🌱 No crop posts available yet. Be the first to post!
          </p>
          <Link
            to="/post-crop"
            className="inline-block mt-4 text-primary hover:text-primary-dark font-semibold transition text-sm sm:text-base"
          >
            Start Trading Now
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestCrops;
