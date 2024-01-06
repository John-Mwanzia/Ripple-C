import React from "react";
import { useFormStatus } from "react-dom";
import Loader from "./Loader";

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#F6D6D6] px-6 py-1 rounded-lg mt-4 w-full shadow-md"
    >
      {pending ? (
        //    center the loader
        <div className="flex justify-center items-center">
          <Loader width={20} height={20} />
        </div>
      ) : (
        <span>Withdraw</span>
      )}
    </button>
  );
}
