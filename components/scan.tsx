"use client";
import { Icon } from "@iconify/react";
import { useRef, useEffect, useState } from "react";

interface ScanProps {
  onClose: () => void;
}

export default function Scan({ onClose }: ScanProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startCamera = async () => {
      try {
        // Check if mediaDevices is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError("Camera not supported on this device");
          setIsLoading(false);
          return;
        }

        // Request camera with more explicit constraints
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        
        streamRef.current = mediaStream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          // Wait for video to be ready
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(() => {
              setIsLoading(false);
            }).catch((playError) => {
              console.error("Error playing video:", playError);
              setError("Failed to start camera playback");
              setIsLoading(false);
            });
          };
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        if (err instanceof Error) {
          setError(`Camera error: ${err.message}`);
        } else {
          setError("Failed to access camera. Please check permissions.");
        }
        setIsLoading(false);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90">
      {/* Camera video background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading camera...</div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="absolute top-60 left-0 right-0 mx-4 bg-red-500 text-white p-4 rounded-lg z-10">
          {error}
        </div>
      )}
      
      {/* Back button */}
      <button
        onClick={handleClose}
        className="absolute left-5 top-12 bg-white rounded-full w-10 h-10 flex items-center justify-center z-10"
      >
        <Icon
          icon="weui:back-filled"
          width="18"
          height="18"
          style={{ color: "black" }}
        />
      </button>

      {/* Scanning frame in the center */}
      <div className="absolute inset-0 flex top-32 justify-center">
        <div className="w-64 h-64 border-4 border-white bg-transparent rounded-3xl" />
      </div>

      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50">
        <div className="mx-auto px-9 pt-3 pb-6 gap-8 flex flex-col justify-center align-center items-center">
          <div className="h-0.5 w-20 bg-[#767676] rounded-4xl" />
          <div className="font-poppins text-lg gap-5">
            <div className="text-xl font-semibold">How to earn</div>
            <div className="text-[14px] font-light">Scan a QR code in any participating shop.<br />These QR codes will give you 5 points per day.</div>
          </div>
          <div className="font-poppins text-lg gap-5">
            <div className="text-xl font-semibold">How to redeem</div>
            <div className="text-[14px] font-light">You can redeem these points at any participating shops' counter or via our online store.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
