import React from "react";
import {
  FaSeedling,
  FaHandshake,
  FaShoppingBasket,
  FaTruck,
} from "react-icons/fa";
import { Link } from "react-router";

const HowItWorks = () => {
  /*** ----------*** :: VARIABLES :: ***---------- ***/
  const steps = [
    {
      icon: <FaSeedling className="text-primary text-5xl mb-4" />,
      title: "1. Create a Crop Post",
      description:
        "Farmers can easily create a crop post by adding crop details such as name, type, quantity, price, and location. This lets buyers discover available produce directly from the source.",
    },
    {
      icon: <FaShoppingBasket className="text-primary text-5xl mb-4" />,
      title: "2. Consumers Show Interest",
      description:
        "Buyers or traders browse crop posts and place an 'Interest' request for the crops they want to purchase. This starts a direct connection between the buyer and the seller.",
    },
    {
      icon: <FaHandshake className="text-primary text-5xl mb-4" />,
      title: "3. Seller Reviews & Approves",
      description:
        "The farmer reviews the buyer's interest and can approve it if they agree to the deal. Once approved, both parties can proceed to finalize payment and delivery details.",
    },
    {
      icon: <FaTruck className=" text-primary text-5xl mb-4" />,
      title: "4. Delivery & Completion",
      description:
        "After approval, the buyer receives the crops through the agreed delivery method. The process ensures fair trade, transparency, and satisfaction for both sides.",
    },
  ];

  return (
    <div className=" mx-auto px-6 py-12 text-center">
      {/* ----------*** :: HOW IT WORKS TITLE :: ***---------- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6 sm:mb-8 md:mb-10 text-center md:text-left">
        <div className="md:w-1/2">
          <p className="text-gray-600 max-w-2xl mx-auto md:mx-0 mb-6 md:mb-0 text-sm sm:text-base md:text-lg leading-relaxed">
            Ankur simplifies agricultural trading by connecting farmers,
            traders, and consumers on one digital platform. Here's how our
            simple and transparent process works:
          </p>
        </div>

        <div className="text-right md:w-1/3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            <span className="text-primary"> How </span>
            <span className="text-secondary">
              {" "}
              Ankur <br /> Works
            </span>
          </h2>
        </div>
      </div>

      {/* ----------*** :: WORK STEPS :: ***---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center justify-center ">
              {" "}
              {step.icon}
            </div>
            <h2 className="text-xl font-semibold mb-3">{step.title}</h2>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-[#eef1e5] py-10 rounded-2xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-4">
          Start Your Journey with Ankur
        </h2>
        <p className="text-gray-600 mb-6">
          Whether you are a farmer looking to sell your crops or a buyer
          searching for fresh produce — Ankur makes trading simple, transparent,
          and rewarding.
        </p>
        <Link to={"/auth/register"} className="btn btn-main w-ful">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
