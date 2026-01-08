#!/usr/bin/env node

/**
 * QR Code Generator Script for Raspberry Pi Zero
 * Run this script on startup to generate QR code image
 * Usage: node scripts/generate-qr.js
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs"); // eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

// Try to use qrcode package if available, otherwise use external API
async function generateQRCode() {
  const timestamp = Date.now();
  const qrValue = `botanict-${timestamp}`;
  const outputPath = path.join(process.cwd(), "public", "qr-code.png");

  // Ensure public directory exists
  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    // Method 1: Try using qrcode npm package (if installed)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const QRCode = require("qrcode");
    await QRCode.toFile(outputPath, qrValue, {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.92,
      margin: 1,
      width: 512,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
    console.log(`✓ QR code generated: ${outputPath}`);
    console.log(`✓ QR Value: ${qrValue}`);
  } catch (err) {
    // Method 2: Fallback to external API
    console.log("qrcode package not found, using external API...");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const https = require("https");

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(
      qrValue
    )}`;

    await new Promise((resolve, reject) => {
      https
        .get(qrUrl, (response) => {
          const fileStream = fs.createWriteStream(outputPath);
          response.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`✓ QR code generated from API: ${outputPath}`);
            console.log(`✓ QR Value: ${qrValue}`);
            resolve(null);
          });
          fileStream.on("error", reject);
        })
        .on("error", reject);
    });
  }
}

generateQRCode().catch((err) => {
  console.error("Error generating QR code:", err.message);
  process.exit(1);
});
