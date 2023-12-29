import React from "react";

const products = [
  {
    productName: "AnkerMake M5 3D Printer",
    productImage:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1682702052-1680885889-ankermake-3d-printer-643048766adbe.jpg?crop=1xw:1xh;center,top&resize=980:*",
    productPrice: "80,000",
    revenueCycle: "30",
    dailyIncome: "5000",
    totalIncome: "150,000",
  },
  {
    productName: "OXO Sweep & Swipe Laptop Cleaner",
    productImage:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1685478553-71kOwvusfiL.jpg?crop=1xw:1xh;center,top&resize=980:*",
    productPrice: "2,000",
    revenueCycle: "23",
    dailyIncome: "150",
    totalIncome: "3,450",
  },
  {
    productName: "HOTO Flashlight Lite",
    productImage:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1680271033-hoto-flashlight-6426e6a7077ca.jpg?crop=1xw:1xh;center,top&resize=980:*",
    productPrice: "8,000",
    revenueCycle: "28",
    dailyIncome: "500",
    totalIncome: "14,000",
  },
  {
    productName: "Backbone One Mobile Gaming Controller for iPhone",
    productImage:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1666729726-backbone-one-controller-1666729708.jpg?crop=1xw:1xh;center,top&resize=980:*",
    productPrice: "15,000",
    revenueCycle: "20",
    dailyIncome: "1,000",
    totalIncome: "20,000",
  },
  {
    productName: " MagSafe 2-in-1 Wireless Charger",
    productImage:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1634825957-belkin-magsafe-2-in-1-wireless-charger-1634825947.jpg?crop=1xw:1xh;center,top&resize=980:*",
    productPrice: "12,000",
    revenueCycle: "18",
    dailyIncome: "850",
    totalIncome: "15,300",
  },
  {
    productName: "Wireless Neckband Earbuds",
    productImage:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1687478664-61dFmUtonHL.jpg?crop=1xw:1xh;center,top&resize=980:*",
    productPrice: "2,000",
    revenueCycle: "25",
    dailyIncome: "150",
    totalIncome: "3,750",
  },
  {
    productName: "wireless mouse",
    productImage:
      "https://officemart.co.ke/media/cache/9d/e3/9de319268424c8a0248e26d1f877ec78.jpg",
    productPrice: "800",
    revenueCycle: "30",
    dailyIncome: "50",
    totalIncome: "1,500",
  },
];

export default function Products() {
  return (
    <div className="mt-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div className="bg-white shadow-md rounded-md p-4">
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
                <img src={product.productImage} alt="" className="w-20 h-20" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-gray-500 text-sm">Revenue Cycle</p>
                <p className="text-[#F0C113]/80 font-semibold">
                  {product.revenueCycle} days
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
                  Ksh {product.totalIncome}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-[#E95514]/80 text-white px-4 py-2 rounded-md">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
