import React from "react";

export default function UserPayForm() {
  return (
    <form
      action=""
      className="mt-4 pb-6 px-4 border-b border-dotted border-gray-300"
    >
      <input
        type="text"
        placeholder="Transaction id [Eg : RLQ79PM6J]"
        className="border px-2 py-1 rounded-lg outline-none  w-full"
      />

      <button
        type="submit"
        className="bg-[#0FB020]/70 px-4 py-1 rounded-lg mt-4 w-full shadow-md"
      >
        I have made the payment
      </button>
    </form>
  );
}
