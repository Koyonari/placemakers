#!/usr/bin/python
# -*- coding:utf-8 -*-
"""
QR Code Display Script for Raspberry Pi Zero with Waveshare 2.13" e-Paper
Fetches DYNAMIC QR codes from placemakers.vercel.app/api/qr every 30 seconds
Each request gets a different QR code with unique timestamp
"""
import sys
import os
import logging
import time
import requests
from io import BytesIO
from PIL import Image

# Setup paths - adjust based on script location
script_dir = os.path.dirname(os.path.realpath(__file__))
# Assuming script is in .../python/examples/
base_dir = os.path.dirname(os.path.dirname(script_dir))
picdir = os.path.join(base_dir, 'pic')
libdir = os.path.join(base_dir, 'lib')

# Add lib directory to path if it exists
if os.path.exists(libdir):
    sys.path.append(libdir)
else:
    # Try alternative paths
    alt_libdir = os.path.join(script_dir, '..', '..', 'lib')
    if os.path.exists(alt_libdir):
        sys.path.append(os.path.abspath(alt_libdir))

from waveshare_epd import epd2in13_V4

logging.basicConfig(level=logging.INFO)

# Configuration
WEB_APP_URL = "https://placemakers.vercel.app/api/qr"  # Dynamic API endpoint
REFRESH_INTERVAL = 30  # seconds
MAX_RETRIES = 3
RETRY_DELAY = 5  # seconds

def fetch_qr_code():
    """Fetch QR code image from web app API - gets a NEW QR code each time"""
    for attempt in range(MAX_RETRIES):
        try:
            # Add cache-busting parameter and timestamp
            url = f"{WEB_APP_URL}?t={int(time.time())}"
            logging.info(f"Fetching NEW QR code from {url} (attempt {attempt + 1}/{MAX_RETRIES})")
            
            # Disable caching on client side
            headers = {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
            
            response = requests.get(url, timeout=10, headers=headers)
            response.raise_for_status()
            
            # Load image from response
            image = Image.open(BytesIO(response.content))
            logging.info("✓ NEW QR code fetched successfully")
            return image
            
        except requests.exceptions.RequestException as e:
            logging.error(f"Error fetching QR code: {e}")
            if attempt < MAX_RETRIES - 1:
                logging.info(f"Retrying in {RETRY_DELAY} seconds...")
                time.sleep(RETRY_DELAY)
            else:
                logging.error("Max retries reached")
                return None
        except Exception as e:
            logging.error(f"Error processing image: {e}")
            return None
    
    return None

def prepare_image_for_display(qr_image, epd):
    """Prepare QR code image for e-paper display"""
    # Create a new image with e-paper dimensions
    display_image = Image.new('1', (epd.height, epd.width), 255)
    
    # Convert QR code to black and white
    qr_image = qr_image.convert('L')  # Convert to grayscale
    qr_image = qr_image.point(lambda x: 0 if x < 128 else 255, '1')  # Convert to 1-bit
    
    # Calculate size to fit the display (leave some margin)
    margin = 10
    max_size = min(epd.height, epd.width) - (2 * margin)
    
    # Resize QR code maintaining aspect ratio
    qr_image.thumbnail((max_size, max_size), Image.LANCZOS)
    
    # Center the QR code on the display
    x = (epd.height - qr_image.width) // 2
    y = (epd.width - qr_image.height) // 2
    
    display_image.paste(qr_image, (x, y))
    
    return display_image

def display_error_message(epd, message):
    """Display error message on e-paper"""
    from PIL import ImageDraw, ImageFont
    
    image = Image.new('1', (epd.height, epd.width), 255)
    draw = ImageDraw.Draw(image)
    
    try:
        font = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 12)
    except:
        font = ImageFont.load_default()
    
    # Word wrap the message
    words = message.split()
    lines = []
    current_line = []
    
    for word in words:
        current_line.append(word)
        line = ' '.join(current_line)
        if draw.textlength(line, font=font) > epd.height - 20:
            current_line.pop()
            lines.append(' '.join(current_line))
            current_line = [word]
    
    if current_line:
        lines.append(' '.join(current_line))
    
    # Draw lines
    y = 20
    for line in lines:
        draw.text((10, y), line, font=font, fill=0)
        y += 15
    
    epd.display(epd.getbuffer(image))

def main():
    epd = None
    
    try:
        logging.info("="*50)
        logging.info("QR Code Display System - DYNAMIC MODE")
        logging.info("="*50)
        logging.info(f"API Endpoint: {WEB_APP_URL}")
        logging.info(f"Refresh Interval: {REFRESH_INTERVAL} seconds")
        logging.info("Each request generates a UNIQUE QR code")
        logging.info("="*50)
        
        # Initialize e-paper display
        epd = epd2in13_V4.EPD()
        logging.info("Initializing e-paper display...")
        epd.init()
        epd.Clear(0xFF)
        logging.info("Display initialized and cleared")
        
        # Main display loop
        qr_count = 0
        while True:
            try:
                qr_count += 1
                logging.info(f"\n{'='*50}")
                logging.info(f"Cycle #{qr_count} - Fetching NEW QR Code")
                logging.info(f"{'='*50}")
                
                # Fetch NEW QR code from web app API
                qr_image = fetch_qr_code()
                
                if qr_image:
                    # Prepare and display image
                    display_image = prepare_image_for_display(qr_image, epd)
                    epd.display(epd.getbuffer(display_image))
                    logging.info(f"✓ QR code #{qr_count} displayed successfully on e-paper")
                else:
                    # Display error message
                    display_error_message(epd, "Failed to fetch QR code. Retrying...")
                    logging.warning("✗ Could not fetch QR code, will retry in next cycle")
                
                # Wait for next refresh
                logging.info(f"\n⏳ Waiting {REFRESH_INTERVAL} seconds until next refresh...")
                logging.info(f"   Next QR will be #{qr_count + 1}\n")
                time.sleep(REFRESH_INTERVAL)
                
            except Exception as e:
                logging.error(f"✗ Error in display loop: {e}")
                try:
                    display_error_message(epd, f"Error: {str(e)}")
                except:
                    pass
                time.sleep(REFRESH_INTERVAL)
        
    except KeyboardInterrupt:
        logging.info("\n" + "="*50)
        logging.info("Shutting down (Ctrl+C pressed)")
        logging.info("="*50)
        if epd:
            logging.info("Clearing display...")
            epd.init()
            epd.Clear(0xFF)
            epd.sleep()
            logging.info("Display cleared and put to sleep")
        epd2in13_V4.epdconfig.module_exit(cleanup=True)
        logging.info("Cleanup complete. Goodbye!")
        
    except Exception as e:
        logging.error(f"\n{'='*50}")
        logging.error(f"FATAL ERROR: {e}")
        logging.error(f"{'='*50}")
        if epd:
            try:
                display_error_message(epd, f"Fatal Error: {str(e)}")
                time.sleep(5)
                epd.sleep()
            except:
                pass
        epd2in13_V4.epdconfig.module_exit(cleanup=True)
        sys.exit(1)

if __name__ == "__main__":
    main()