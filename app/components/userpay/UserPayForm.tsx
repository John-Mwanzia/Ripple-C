import formAction from "@/handlers/actions";
import prisma from "@/modules/db";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface FormErrors {
  MpesaCode?: string;
  [key: string]: string | undefined;
}

export default function UserPayForm({
  firstName,
  phoneNumber,
  amount,
  paymentId,
}) {
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    // validate form data
    // mpesa code should be 10 characters not more or less long, string required and not empty and show specific error message

    const schema = Yup.object().shape({
      MpesaCode: Yup.string()
        .required("Mpesa code is required")
        .matches(/^.{10}$/, {
          message: "Mpesa code must be 10 characters",
          excludeEmptyString: true, // Exclude error if field is empty
        }),
    });

    try {
      const MpesaCode = formData.get("MpesaCode");

      await schema.validate(
        {
          MpesaCode,
        },
        { abortEarly: false }
      );

      setValidationErrors({});

      // if validation is successful, send a request to the server to verify the mpesa code
      try {
        const res = await formAction(formData, phoneNumber, amount, paymentId);

        if (res?.status === "error") {
          toast.error(res.message);
        }

        if (res?.status === "success") {
          toast.success("Payment successful 🎉, wait for confirmation");

          //redirect to home page
          router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    } catch (validationError) {
      const formattedErrors = {};
      validationError.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setValidationErrors(formattedErrors);

      if (validationErrors && validationErrors.MpesaCode) {
        toast.error(validationErrors.MpesaCode);
      }
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

      {validationErrors && validationErrors.MpesaCode && (
        <div style={{ color: "red" }}>{validationErrors.MpesaCode}</div>
      )}

      <button
        type="submit"
        className="bg-[#0FB020]/70 px-4 py-1 rounded-lg mt-4 w-full shadow-md"
      >
        I have made the payment
      </button>
    </form>
  );
}
