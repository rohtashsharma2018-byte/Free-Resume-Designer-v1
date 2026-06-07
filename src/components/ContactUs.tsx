import React from "react";
import { Construction } from "lucide-react";

interface ContactUsProps {
  onBack: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center text-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-sm w-full">
        <Construction className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Contact Us</h1>
        <p className="text-slate-600">This page is under construction.</p>
        <button
          onClick={onBack}
          className="mt-6 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
