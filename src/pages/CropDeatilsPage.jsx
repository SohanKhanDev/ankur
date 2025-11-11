import React, { use, useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  FaBox,
  FaDollarSign,
  FaEnvelope,
  FaWeightHanging,
  FaCheckCircle,
} from "react-icons/fa";
import { useLoaderData } from "react-router";
import { AuthContext } from "../providers/AuthProvide";
import { toast } from "react-toastify";
import CropInfo from "../components/CropInfo";
import ExpressInterest from "../components/ExpressInterest";
import InterestsTable from "../components/InterestsTable";

const CropDetailsPage = () => {
  /*** ----------*** :: HOOKS :: ***---------- ***/
  const data = useLoaderData();

  const [crop, setCrop] = useState(data);
  const {
    _id,
    description,
    image,
    name,
    pricePerUnit,
    quantity,
    type,
    unit,
    owner,
  } = crop;

  const { user, actionLoading, setActionLoading } = use(AuthContext);

  const [interestQuantity, setInterestQuantity] = useState(1);
  const [interestMessage, setInterestMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isOwner = user?.email === owner?.ownerEmail;

  /*** ----------*** :: VALIDATION => INTEREST  :: ***---------- ***/
  useEffect(() => {
    if (user?.email && crop?.interests?.length > 0) {
      const alreadyInterested = crop.interests.some(
        (interest) => interest.userEmail === user.email
      );
      if (alreadyInterested) {
        setIsSubmitted(true);
      }
    }
  }, [user, crop]);

  /*** ----------*** :: CALCULATION => TOTAL PRICE  :: ***---------- ***/
  const totalPrice = (interestQuantity * pricePerUnit).toFixed(2);

  /*** ----------*** :: HANDLER => SUBMIT INTEREST  :: ***---------- ***/
  const handleSubmitInterest = (e) => {
    e.preventDefault();
    setActionLoading(true);
    setIsSubmitted(false);

    /*** ----------*** :: VALIDATION => INTERESTED QTY  :: ***---------- ***/
    if (quantity < interestQuantity) {
      return toast.error("Interest Qty is Higher then Stock Qty");
    }

    /*** ----------*** :: DATABASE => POST => INTEREST  :: ***---------- ***/
    const newInterest = {
      cropId: _id,
      userEmail: user.email,
      userName: user.displayName,
      quantity: interestQuantity,
      message: interestMessage,
      totalPrice,
    };

    fetch(`http://localhost:3000/interests/${_id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newInterest),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after insert:", data);
        if (data.acknowledged) {
          toast.success("Interest Submitted!! 🎉");
          const addedInterest = {
            ...newInterest,
            _id: data.insertedId,
            status: "Pending",
          };

          setCrop((prev) => ({
            ...prev,
            interests: [...(prev.interests || []), addedInterest],
          }));
          setIsSubmitted(true);
        }
      });
    setActionLoading(false);
  };

  /*** ----------*** :: HANDLER => INTEREST ACCEPT  :: ***---------- ***/
  const handleInterestAccept = (interestId) => {
    const interest = crop.interests.find(
      (interest) => interest._id === interestId
    );
    if (quantity < interest.quantity) {
      return toast.error(`Insufficient Stock!!`);
    }

    fetch(`http://localhost:3000/interests/accept?interestId=${interestId}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Interest accepted:", data);

        setCrop((prevCrop) => ({
          ...prevCrop,
          // update stock
          quantity: prevCrop.quantity - interest.quantity,
          // update interest status
          interests: prevCrop.interests.map((prev) =>
            prev._id === interestId ? { ...prev, status: "Accepted" } : prev
          ),
        }));
      })
      .catch((error) => console.error("Error:", error));
  };
  console.log(user?.email, crop?.owner?.ownerEmail);

  /*** ----------*** :: HANDLER => INTEREST REJECT  :: ***---------- ***/
  const handleInterestReject = (interestId) => {
    fetch(`http://localhost:3000/interests/reject?interestId=${interestId}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Interest rejected:", data);

        setCrop((prevCrop) => ({
          ...prevCrop,
          interests: prevCrop.interests.map((prev) =>
            prev._id === interestId ? { ...prev, status: "Rejected" } : prev
          ),
        }));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen p-8 font-sans">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-xl p-8 md:p-12">
        {/* ----------*** :: CROPS & INTEREST (TOP PART) :: ***---------- */}
        <div className=" border-black pb-9">
          {/* ----------*** :: CROP NAME :: ***---------- */}
          <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
            <h1 className="text-4xl font-extrabold text-[#d35507] capitalize">
              {name}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-30">
            {/* ----------*** :: LEFT SIDE :: ***---------- */}
            <CropInfo
              crop={crop}
              name={name}
              image={image}
              type={type}
              quantity={quantity}
              unit={unit}
              pricePerUnit={pricePerUnit}
              description={description}
            ></CropInfo>

            {/* ----------*** :: RIGHT SIDE :: ***---------- */}
            <ExpressInterest
              isOwner={isOwner}
              isSubmitted={isSubmitted}
              handleSubmitInterest={handleSubmitInterest}
              interestQuantity={interestQuantity}
              setInterestQuantity={setInterestQuantity}
              interestMessage={interestMessage}
              setInterestMessage={setInterestMessage}
              totalPrice={totalPrice}
              unit={unit}
              actionLoading={actionLoading}
            ></ExpressInterest>
          </div>
        </div>

        {/* ----------*** :: EXISTING INTERESTS (MIDDLE PART) :: ***---------- */}
        <InterestsTable
          interests={crop?.interests}
          cropUnit={unit}
          handleInterestAccept={handleInterestAccept}
          handleInterestReject={handleInterestReject}
        ></InterestsTable>
      </div>
    </div>
  );
};

export default CropDetailsPage;
