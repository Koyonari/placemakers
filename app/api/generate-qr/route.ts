import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import https from "https";

export async function POST() {
  try {
    const timestamp = Date.now();
    const qrValue = `botanict-${timestamp}`;

    // Generate QR code URL
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(qrValue)}`;

    // Get the public directory path
    const publicDir = path.join(process.cwd(), "public");
    const outputPath = path.join(publicDir, "qr-code.png");

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Download QR code from API and save to file
    return new Promise((resolve) => {
      https.get(qrUrl, (response) => {
        const fileStream = fs.createWriteStream(outputPath);

        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`QR code generated: ${outputPath}`);
          console.log(`QR Value: ${qrValue}`);

          resolve(
            NextResponse.json({
              success: true,
              qrValue,
              imagePath: "/qr-code.png",
            })
          );
        });

        fileStream.on("error", (err) => {
          console.error("Error writing file:", err);
          resolve(
            NextResponse.json(
              { error: "Failed to save QR code" },
              { status: 500 }
            )
          );
        });
      });
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
