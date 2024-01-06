"use client";

import { Store } from "@/contexts/store";
import { createInvestment, getUserData } from "@/handlers/api";
import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import Loader from "../Loader";

export default function Products({ products }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loadingIndices, setLoadingIndices] = useState<number[]>([]);

  const { state } = useContext(Store);
  const { token } = state;
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          // Fetch user data
          const response = await getUserData({
            phoneNumber: token.phoneNumber,
          });

          // Once data is fetched, set it in state
          setUserData(response.data);
          //   console.log(response.data.Account[0].balance);
        } catch (error) {
          // Handle errors if needed
          console.error(error);
        }
      };

      fetchData();
    }
  }, [token]);

  const handleCloseModal = () => {
    setError(null);
  };

  const handleRecharge = () => {
    // Redirect to recharge page
    console.log("Recharge");

    // router.push("/recharge");
  };

  const handleBuyNow = async (product, index) => {
    try {
      setLoadingIndices((prev) => [...prev, index]);

      // Check if user has enough balance to buy the product
      if (userData && userData.Account[0].balance >= product.productPrice) {
        // send a request to create an investment(product bought) for the user in the database and update the user's account balance

        // Show loader

        const response = await createInvestment({
          productId: product.id,
          phoneNumber: userData.phoneNumber,
          productName: product.productName,
          productPrice: product.productPrice,
          revenueCycle: product.cycle,
          dailyIncome: product.dailyIncome,
          totalIncome: product.totalIncome,
        });

        // Hide loader
        setLoadingIndices((prev) => prev.filter((i) => i !== index));

        // Show success message

        if (response.data) {
          toast.success("Product bought successfully");
        }
      } else {
        // Show error message
        setError("Insufficient balance");
      }
    } catch (error) {
      // Handle errors if needed
      setLoadingIndices((prev) => prev.filter((i) => i !== index));
      console.error(error);
    }
  };

  return (
    <div className="mt-4 pb-20 flex justify-center    items-center">
      <div className="w-[95%] xl:w-[80%] flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div
              key={product.productName}
              className="bg-white shadow-md rounded-md p-4"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-800 font-semibold">
                    {product.productName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Price: {product.productPrice}
                  </p>
                </div>
                <div>
                  <img
                    src={product.productImage}
                    alt=""
                    className="w-20 h-20"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-gray-500 text-sm">Revenue Cycle</p>
                  <p className="text-[#F0C113]/80 font-semibold">
                    {product.cycle} days
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Daily Income</p>
                  <p className="text-[#E95514]/80 font-semibold">
                    Ksh {product.dailyIncome}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Income</p>
                  <p className="text-gray-800 font-semibold">
                    Ksh{" "}
                    {//  multiply the daily income by the revenue cycle
                    product.dailyIncome * product.cycle}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                {loadingIndices.includes(index) ? (
                  <Loader width={30} height={30} />
                ) : (
                  <button
                    onClick={() => handleBuyNow(product, index)} // Pass index here
                    className="bg-[#E95514]/80 text-white px-4 py-2 rounded-md"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <Modal
            error={error}
            onClose={handleCloseModal}
            onRecharge={handleRecharge}
          />
        )}
      </div>
    </div>
  );
}
