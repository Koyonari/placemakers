"use client";
import { Icon } from "@iconify/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { usePoints } from "@/lib/points-context";
import { useRewards } from "@/lib/rewards-context";
import ScanConfirmation from "./scanconfirmation";

interface ScanProps {
  onClose: () => void;
}

export default function Scan({ onClose }: ScanProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jsQRRef = useRef<
    | ((
        data: Uint8ClampedArray,
        width: number,
        height: number
      ) => { data: string } | null)
    | null
  >(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(15); // Default to gold tier
  const { addPoints, tier } = usePoints();
  const { addReward } = useRewards();

  // Calculate points based on tier
  const getPointsForTier = (tierType: string): number => {
    switch (tierType) {
      case "silver":
        return 30;
      case "gold":
        return 40;
      case "diamond":
        return 50;
      default:
        return 10;
    }
  };

  // Load jsQR library
  useEffect(() => {
    const loadJsQR = async () => {
      try {
        const jsQR = await import("jsqr");
        jsQRRef.current = jsQR.default;
      } catch (err) {
        console.error("Failed to load jsQR:", err);
      }
    };
    loadJsQR();
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError("Camera not supported on this device");
          setIsLoading(false);
          return;
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        streamRef.current = mediaStream;

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current
              ?.play()
              .then(() => {
                setIsLoading(false);
              })
              .catch((playError) => {
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
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClose = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    onClose();
  }, [onClose]);

  const handleScan = useCallback(() => {
    if (scanned) return;
    setScanned(true);

    const points = getPointsForTier(tier);
    setEarnedPoints(points);

    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const newReward = {
      id: Math.floor(Math.random() * 10000),
      icon: "flat-color-icons:shop",
      title: "Scan Reward Earned",
      location: "Botanict @",
      road: "Clementi Blk 352",
      unit: "#01-123",
      date: dateString,
      points: points,
    };

    addReward(newReward);
    addPoints(points);
    setShowConfirmation(true);

    setTimeout(() => {
      handleClose();
    }, 3500);
  }, [scanned, addReward, addPoints, handleClose, tier]);

  useEffect(() => {
    if (
      !isLoading &&
      !error &&
      videoRef.current &&
      canvasRef.current &&
      !scanned
    ) {
      const scanInterval = setInterval(() => {
        try {
          const canvas = canvasRef.current;
          const video = videoRef.current;

          if (!canvas || !video) return;

          const context = canvas.getContext("2d");
          if (!context) return;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          // Use jsQR to decode the QR code
          if (jsQRRef.current) {
            const qrCode = jsQRRef.current(
              imageData.data,
              canvas.width,
              canvas.height
            );

            if (qrCode) {
              // Successfully decoded a QR code
              const decodedData = qrCode.data;

              // Check if it's a botanict QR code
              if (decodedData.startsWith("botanict")) {
                handleScan();
                clearInterval(scanInterval);
              }
            }
          }
        } catch (err) {
          console.error("Error during QR detection:", err);
        }
      }, 500);

      return () => clearInterval(scanInterval);
    }
  }, [isLoading, error, scanned, handleScan]);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/90">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        <canvas ref={canvasRef} className="hidden" />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-xl">Loading camera...</div>
          </div>
        )}

        {error && (
          <div className="absolute top-60 left-0 right-0 mx-4 bg-red-500 text-white p-4 rounded-lg z-10">
            {error}
          </div>
        )}

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

        <div className="absolute inset-0 flex top-32 justify-center">
          <div className="w-64 h-64 border-4 border-white bg-transparent rounded-3xl" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50">
          <div className="mx-auto px-9 pt-3 pb-6 gap-8 flex flex-col justify-center align-center items-center">
            <div className="h-0.5 w-20 bg-[#767676] rounded-4xl" />
            <div className="font-poppins text-lg gap-5">
              <div className="text-xl font-semibold">How to earn</div>
              <div className="text-[14px] font-light">
                Scan a QR code in any participating shop.
                <br />
                These QR codes will give you 5 points per day.
              </div>
            </div>
            <div className="font-poppins text-lg gap-5">
              <div className="text-xl font-semibold">How to redeem</div>
              <div className="text-[14px] font-light">
                You can redeem these points at any participating shops&apos;
                counter or via our online store.
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScanConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        points={earnedPoints}
      />
    </>
  );
}
