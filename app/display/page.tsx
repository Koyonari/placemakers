"use client";
import { useState, useEffect } from "react";

export default function Display() {
  const [imageKey, setImageKey] = useState(0);

  useEffect(() => {
    // Refresh QR code every 30 seconds
    const interval = setInterval(() => {
      // Trigger re-generation on the server
      fetch("/api/generate-qr", { method: "POST" })
        .then(() => {
          // Force image reload by adding a cache-busting query parameter
          setImageKey((prev) => prev + 1);
        })
        .catch((err) => console.error("Error refreshing QR code:", err));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-4">
      <img 
        key={imageKey}
        src={`/qr-code.png?v=${imageKey}`}
        alt="QR Code" 
        className="w-full max-w-md h-auto"
        style={{
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
