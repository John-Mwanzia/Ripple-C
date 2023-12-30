import React, { useRef, useEffect } from "react";

const Modal = ({ error, onClose, onRecharge }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div
        className="bg-white z-50 rounded-lg p-6 max-w-md w-[80%]"
        ref={modalRef}
      >
        <p className="text-center text-red-600 font-semibold">{error}</p>
        <p className="text-center text-gray-500 mt-4">
          Do you want to recharge?
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 rounded-md py-2 px-4 mr-4 focus:outline-none"
          >
            Close
          </button>
          <button
            onClick={onRecharge}
            className="bg-blue-500 text-white rounded-md py-2 px-4 focus:outline-none"
          >
            Recharge
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
