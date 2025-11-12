import React from "react";
import { FaRegNewspaper } from "react-icons/fa";

const AgroNews = () => {
  const newsList = [
    {
      title: "Government Announces New Subsidy for Fertilizers",
      date: "November 5, 2025",
      description:
        "The Ministry of Agriculture has introduced a new subsidy program to make fertilizers more affordable for small farmers across Bangladesh. This aims to boost crop yield and reduce input costs.",
      image:
        "https://images.pexels.com/photos/19686456/pexels-photo-19686456.jpeg",
    },
    {
      title: "Digital Market Access Growing Among Rural Farmers",
      date: "October 28, 2025",
      description:
        "More farmers are joining online marketplaces like Ankur to sell their crops directly to buyers. This shift is improving transparency and giving farmers better control over pricing.",
      image:
        "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg",
    },
    {
      title: "Monsoon Season Crop Outlook 2025",
      date: "October 15, 2025",
      description:
        "Experts predict a strong monsoon this year, expected to benefit rice and jute production. Farmers are advised to follow the updated irrigation guidelines released by the Agriculture Board.",
      image:
        "https://images.pexels.com/photos/13081031/pexels-photo-13081031.jpeg",
    },
  ];

  return (
    <section className=" py-8 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold  mb-4">
          <span className="text-secondary"> Latest </span>{" "}
          <span className="text-primary "> Agro News</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Stay updated with the latest agricultural news, market insights, and
          government initiatives to help you make better farming and trading
          decisions.
        </p>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {newsList.map((news, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden text-left"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{news.date}</p>
              <h3 className="text-xl font-semibold text-secondary mb-3 hover:text-green-800 cursor-pointer">
                {news.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{news.description}</p>
              <button className="text-primary font-semibold hover:text-green-700">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AgroNews;
