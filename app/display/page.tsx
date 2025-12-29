"use client";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

export default function Display() {
  const [qrCode, setQrCode] = useState("botanict-001");

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = Date.now();
      setQrCode(`botanict-${timestamp}`);
    }, 30000); // Change QR code every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <QRCode value={qrCode} size={122} className="max-w-full h-auto" />
    </div>
  );
}
