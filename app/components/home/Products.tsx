"use client";

import { Store } from "@/contexts/store";
import { createInvestment, getUserData } from "@/handlers/api";
import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

export default function Products({ products }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loadingIndices, setLoadingIndices] = useState<number[]>([]);
  const router = useRouter();

  const { state } = useContext(Store);
  const { token } = state;
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token) as MyDecodedToken;
      const fetchData = async () => {
        try {
          // Fetch user data
          const response = await getUserData({
            phoneNumber: decodedToken.phoneNumber,
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
    // Redirect to recharge page /wallet/recharge/${userData.id}

    router.push(`/wallet/recharge/${userData.id}`);
  };

  const handleBuyNow = async (product, index) => {
    try {
      setLoadingIndices((prev) => [...prev, index]);

      if (!userData) {
        setLoadingIndices((prev) => prev.filter((i) => i !== index));
        // Handle missing user data
        console.error("User data not available");
        return;
      }

      const userBalance = userData.Account[0].balance;
      const productPrice = product.productPrice;

      if (userBalance < productPrice) {
        setLoadingIndices((prev) => prev.filter((i) => i !== index));
        setError("Insufficient balance");
        return;
      }

      const response = await createInvestment({
        productId: product.id,
        phoneNumber: userData.phoneNumber,
        category: product.category,
        productPrice: product.productPrice,
        revenueCycle: product.cycle,
        dailyIncome: product.dailyIncome,
        totalIncome: product.totalIncome,
      });

      setLoadingIndices((prev) => prev.filter((i) => i !== index));

      if (response.data) {
        // Consider updating user data with the new balance from the response
        // Example: setUserData(response.updatedUserData);
        toast.success("Product bought successfully");
      }
    } catch (error) {
      setLoadingIndices((prev) => prev.filter((i) => i !== index));
      console.error(error);
      // Handle errors if needed
    }
  };

  return (
    <div className="mt-4 pb-20 flex justify-center    items-center">
      <div className="w-[95%] xl:w-[80%] flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="bg-white shadow-md rounded-md p-4">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-12 justify-center items-center">
                    <div className="flex gap-2 justify-center items-center">
                      {/* show different images depending whether the category is Vip or Regula */}
                      {product.category === "Vip" ? (
                        <Image
                          src="https://cdn-icons-png.flaticon.com/128/6941/6941697.png"
                          alt="vip"
                          width={30}
                          height={30}
                        />
                      ) : (
                        <Image
                          src="https://cdn-icons-png.flaticon.com/128/7166/7166814.png"
                          alt="regular"
                          width={30}
                          height={30}
                        />
                      )}
                      <p className="text-gray-800 font-semibold">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {" "}
                      <span>level:</span> {product.level}
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Price: {product.productPrice}
                  </p>
                </div>
                {/* <div>
                  <img
                    src={product.productImage}
                    alt=""
                    className="w-20 h-20"
                  />
                </div> */}
                <div className="flex justify-end ">
                  {loadingIndices.includes(index) ? (
                    <Loader width={30} height={30} />
                  ) : (
                    <button
                      onClick={() => handleBuyNow(product, index)} // Pass index here
                      className="bg-[#4294FF]/80 text-white px-4 py-2 rounded-md"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-between gap-5 lg:gap-10 mt-4">
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
              {/* <div className="flex justify-end mt-4">
                {loadingIndices.includes(index) ? (
                  <Loader width={30} height={30} />
                ) : (
                  <button
                    onClick={() => handleBuyNow(product, index)} // Pass index here
                    className="bg-[#4294FF]/80 text-white px-4 py-2 rounded-md"
                  >
                    Buy Now
                  </button>
                )}
              </div> */}
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
