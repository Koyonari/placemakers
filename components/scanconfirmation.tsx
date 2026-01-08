"use client";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

interface ScanConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

export default function ScanConfirmation({
  isOpen,
  onClose,
  points,
}: ScanConfirmationProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl w-[85%] max-w-sm shadow-lg animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center gap-4 p-8">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-[#FF5B49] rounded-full flex items-center justify-center animate-pulse">
            <Icon
              icon="mdi:success"
              width="32"
              height="32"
              style={{ color: "#FFFFFF" }}
            />
          </div>

          {/* Success Message */}
          <div className="text-center">
            <h2 className="font-poppins font-semibold text-[20px] text-[#131313] mb-2">
              QR Code Scanned!
            </h2>
            <p className="font-poppins text-[14px] text-[#767676]">
              Great! You earned rewards
            </p>
          </div>

          {/* Points Display */}
          <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-full px-4 py-2">
            <img src="points.png" alt="Points" className="w-5 h-5" />
            <span className="font-poppins font-bold text-[16px] text-[#FF5B49]">
              +{points} pts
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 py-3 bg-[#FF5B49] text-white rounded-2xl font-poppins font-semibold text-[14px] hover:bg-[#E54635] transition-colors"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
