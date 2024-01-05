import formAction from "@/handlers/actions";
import prisma from "@/modules/db";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserPayForm({
  firstName,
  phoneNumber,
  amount,
  paymentId,
}) {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const res = await formAction(formData, phoneNumber, amount, paymentId);

    if (res?.status === "error") {
      toast.error(res.message);
    }

    if (res?.status === "success") {
      toast.success("Payment successful 🎉, wait for confirmation");

      //redirect to home page
      router.push("/");
    }
  };

  return (
    <form
      action={handleSubmit}
      className="mt-4 pb-6 px-4 border-b border-dotted border-gray-300"
    >
      <input
        type="text"
        name="MpesaCode"
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
