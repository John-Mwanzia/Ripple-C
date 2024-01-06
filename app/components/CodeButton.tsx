import React from "react";
import { useFormStatus } from "react-dom";
import Loader from "./Loader";

export default function CodeButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#0FB020]/70 px-4 py-1 rounded-lg mt-4 w-full shadow-md"
    >
      {pending ? (
        //    center the loader
        <div className="flex justify-center items-center">
          <Loader width={20} height={20} />
        </div>
      ) : (
        <span>I have made the payment</span>
      )}
    </button>
  );
}
