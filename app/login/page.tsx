"use client"
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Home() {
  const [expandedWarning, setExpandedWarning] = useState(false);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col fixed inset-0 z-50 overflow-y-auto font-inter">
      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <img src="logo.png" alt="Place Makers" className="w-48" />
      </div>

      {/* Warning Banner */}
      <div className="border-t border-gray-200">
        <button
          onClick={() => setExpandedWarning(!expandedWarning)}
          className="w-full bg-[#F6F6F6] pt-8 px-10 py-4 flex flex-row justify-between items-center"
        >
          <span className="font-bold text-sm text-black">
            Beware of impersonation scams
          </span>
          <Icon
            icon="mynaui:chevron-down"
            className={`size-5 text-[#FF5B49] transition-transform ${
              expandedWarning ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedWarning && (
          <div className="bg-[#F6F6F6] px-10 pb-4 text-sm text-gray-700">
            <p>Be cautious of scammers impersonating official services.</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center pt-4 pb-12 bg-[#F6F6F6]">
        <p className="text-[28px] font-semibold text-black px-6 mb-3 bg-[#F6F6F6]">
          Log in with Singpass
        </p>
        <p className="text-lg text-gray-600 mb-4 bg-[#F6F6F6] px-6">
          Your trusted digital identity
        </p>

        {/* QR Code Section Placeholder */}
        <div className="w-full flex items-center flex-col bg-white">
          <img src = "singpass.png" className = "w-[70%] mt-6 mb-3 bg-white" />

          {/* Links */}
          <div className="flex flex-col items-center w-full gap-4 pt-8 bg-[#F6F6F6]">
            <a
              href="#"
              className="text-[#0066CC] text-lg underline hover:text-[#0052A3]"
            >
              Register for Singpass
            </a>
            <a
              href="#"
              className="text-[#0066CC] text-lg underline hover:text-[#0052A3]"
            >
              Download Singpass app
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
