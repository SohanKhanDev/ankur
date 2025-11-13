import React from "react";
import {
  FaLeaf,
  FaUserFriends,
  FaMoneyBillWave,
  FaMobileAlt,
} from "react-icons/fa";

const WhyChooseAnkur = () => {
  /*** ----------*** :: VARIABLES :: ***---------- ***/
  const features = [
    {
      icon: <FaLeaf className="text-secondary text-5xl mb-4" />,
      title: "Direct Farmer Connection",
      description:
        "We remove middlemen, ensuring that farmers earn fair prices and consumers get the freshest produce directly from the source.",
    },
    {
      icon: <FaUserFriends className="text-secondary text-5xl mb-4" />,
      title: "Trusted Community",
      description:
        "Ankur builds a reliable network of verified farmers, traders, and buyers, fostering transparency and trust in every transaction.",
    },
    {
      icon: <FaMoneyBillWave className="text-secondary text-5xl mb-4" />,
      title: "Fair & Transparent Trade",
      description:
        "With clear pricing, open communication, and digital records, Ankur makes agricultural trade simple, fair, and transparent.",
    },
    {
      icon: <FaMobileAlt className="text-secondary text-5xl mb-4" />,
      title: "Easy to Use",
      description:
        "Post your crops, browse listings, or show buying interest—all from your phone or computer in just a few clicks.",
    },
  ];

  return (
    <div className="py-8 px-6 text-center">
      {/* ----------*** :: LATEST CROPS TITLE :: ***---------- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6 sm:mb-8 md:mb-10 text-center md:text-left">
        <div className="md:w-1/3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            <span className="text-primary"> Why </span>
            <span className="text-secondary">Choose Ankur ?</span>
          </h2>
        </div>

        <div className="md:w-1/2 text-right">
          <p className="text-gray-600 max-w-2xl mx-auto md:mx-0 mb-6 md:mb-0 text-sm sm:text-base md:text-lg leading-relaxed">
            Ankur empowers farmers and traders through a simple, transparent,
            and digital agricultural ecosystem that helps everyone grow
            together.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center justify-center">
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold  mb-3">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseAnkur;
