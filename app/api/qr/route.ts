/**
 * Dynamic QR Code API Route
 * Returns a different QR code on each request
 * Usage: GET /api/qr
 */

import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering - don't cache this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Generate unique value based on timestamp
    const timestamp = Date.now();
    const qrValue = `botanict-${timestamp}`;

    // Use QR code API to generate image
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(
      qrValue
    )}&format=png`;

    // Fetch the QR code image
    const response = await fetch(qrUrl);

    if (!response.ok) {
      throw new Error("Failed to generate QR code");
    }

    const imageBuffer = await response.arrayBuffer();

    // Return the image with proper headers to prevent caching
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
