#!/bin/bash

# Placemakers QR Code Display Startup Script for Raspberry Pi Zero
# This script generates a QR code image and displays it on startup

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_DIR="$PROJECT_DIR/public"
QR_OUTPUT="$PUBLIC_DIR/qr-code.png"

echo "🚀 Starting Placemakers QR Code Display..."

# Ensure public directory exists
mkdir -p "$PUBLIC_DIR"

# Generate QR code image
echo "📱 Generating QR code..."
node - << 'EOF'
const https = require('https');
const fs = require('fs');
const path = require('path');

const publicDir = process.env.PUBLIC_DIR;
const outputPath = path.join(publicDir, 'qr-code.png');

function generateQR() {
  const timestamp = Date.now();
  const qrValue = `botanict-${timestamp}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(qrValue)}`;

  console.log(`Generating QR code with value: ${qrValue}`);

  https.get(qrUrl, (response) => {
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`✓ QR code saved to: ${outputPath}`);
      console.log(`✓ QR Value: ${qrValue}`);
    });

    fileStream.on('error', (err) => {
      console.error('Error writing file:', err);
      process.exit(1);
    });
  }).on('error', (err) => {
    console.error('Error downloading QR code:', err);
    process.exit(1);
  });
}

generateQR();
EOF

# Wait a moment for file to be generated
sleep 2

# Display the QR code image
if [ -f "$QR_OUTPUT" ]; then
  echo "✓ QR code ready at: $QR_OUTPUT"
  echo "🖼️  Opening QR code display..."
  
  # For Raspberry Pi with display, use fbi (framebuffer image viewer)
  if command -v fbi &> /dev/null; then
    echo "Using fbi to display QR code..."
    fbi -a "$QR_OUTPUT"
  
  # Fallback: use imagemagick display
  elif command -v display &> /dev/null; then
    echo "Using ImageMagick display..."
    display -window root "$QR_OUTPUT"
  
  # Fallback: Open with default image viewer
  elif command -v eog &> /dev/null; then
    echo "Using Eye of GNOME..."
    eog "$QR_OUTPUT"
  
  # For headless setup, refresh QR every 30 seconds
  else
    echo "No image viewer found. Refreshing QR code every 30 seconds..."
    while true; do
      sleep 30
      echo "📱 Refreshing QR code..."
      node - << 'REFRESH_EOF'
const https = require('https');
const fs = require('fs');
const path = require('path');

const publicDir = process.env.PUBLIC_DIR;
const outputPath = path.join(publicDir, 'qr-code.png');

function generateQR() {
  const timestamp = Date.now();
  const qrValue = `botanict-${timestamp}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(qrValue)}`;

  https.get(qrUrl, (response) => {
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`✓ QR code refreshed: ${qrValue}`);
    });
    fileStream.on('error', (err) => {
      console.error('Error writing file:', err);
    });
  }).on('error', (err) => {
    console.error('Error downloading QR code:', err);
  });
}

generateQR();
REFRESH_EOF
    done
  fi
else
  echo "❌ Failed to generate QR code"
  exit 1
fi
