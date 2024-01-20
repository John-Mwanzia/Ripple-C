import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-orange-red text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600">
          TRADVOW INVESTMENT COMPANY
        </h1>
      </header>

      <main className="container mx-auto px-4 mt-8">
        <section className="text-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="mb-4">
            <b className="text-orange-red">TRADVOW INVESTMENT COMPANY</b> is a
            financial company dedicated to helping communities develop
            financially. We provide the guidance and support our customers need
            to grow their wealth.
          </p>
          <p className="mb-4">
            We have partnered with other companies and non-governmental
            organizations to ensure the financial stability of our clients.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Investment Plans</h2>
          <div className="mb-4">
            <p className="mb-2">
              <b>Tradvow Investment Company</b> offers a variety of investment
              plans designed to fit the diverse socio-economic levels of our
              clients, regardless of their financial income. These plans
              include:
            </p>
            <ul className="list-disc ml-4">
              <li className="mb-2">Raising living standards</li>
              <li className="mb-2">Financial stability</li>
              <li className="mb-2">Shares Buying/Selling</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Invest with Us?</h2>
          <p className="mb-4">
            <b>TRADVOW INVESTMENT COMPANY</b> is the best financial partner you
            can choose. Here's why:
          </p>
          <ul className="list-disc ml-4">
            <li className="mb-2">High rates of earning</li>
            <li className="mb-2">Best customer care services</li>
            <li className="mb-2">Transparency in our services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            Join our official WhatsApp and Telegram groups to achieve high
            financial stability with <b>TRADVOW INVESTMENT COMPANY</b>.
          </p>
          <div className="flex items-center justify-center mt-4">
            <Link
              href="https://chat.whatsapp.com/B4oiSFzvNJ86jeYBGoYqSa"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
            >
              WhatsApp
              <Image
                src="https://cdn-icons-png.flaticon.com/128/2111/2111728.png"
                alt="whatsapp"
                width={30}
                height={30}
                className="ml-2"
              />
            </Link>
            <Link
              href="https://t.me/trdcompany"
              className="ml-4 inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-800"
            >
              Telegram
              <Image
                src="https://cdn-icons-png.flaticon.com/128/5968/5968804.png"
                alt="telegram"
                width={30}
                height={30}
                className="ml-2"
              />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
