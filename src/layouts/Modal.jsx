import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // kalau modal tidak terbuka, jangan render apapun

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
                <button
                    className="absolute top-2 right-2 text-red-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
