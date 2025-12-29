import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import Scan from "@/components/scan";

// Declare Google Maps types
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

interface HeaderProps {
  onScanClick: () => void;
}

interface Block {
  id: string;
  number: string;
  address: string;
}

interface Shop {
  id: number;
  name: string;
  image: string;
  location: string;
  points: number;
  blocks: Block[];
}

// Google Maps component
function RouteMap({
  blocks,
  userLocation,
  shopName,
}: {
  blocks: Block[];
  userLocation: { lat: number; lng: number } | null;
  shopName: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const googleMapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const directionsServiceRef = useRef<any>(null); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const directionsRendererRef = useRef<any>(null);

  useEffect(() => {
    const API_KEY = "AIzaSyB7l7PKt9MxHvQfz3tZqA94g5RdEi39or8";

    const loadGoogleMaps = () => {
      // Prevent loading if key is missing
      if (!API_KEY) {
        console.error(
          "Google Maps API Key not found. Please set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file."
        );
        return;
      }

      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector(
        `script[src*="maps.googleapis.com"]`
      );
      if (existingScript) {
        existingScript.addEventListener("load", initMap);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current) return;

      const google = window.google;

      // Initialize map
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        zoom: 14,
        center: userLocation || { lat: 1.3521, lng: 103.8198 },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      // Initialize directions service and renderer
      directionsServiceRef.current = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map: googleMapRef.current,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: "#4285F4",
          strokeWeight: 5,
        },
      });

      // Calculate and display route
      calculateRoute();
    };

    const calculateRoute = () => {
      if (!userLocation || blocks.length === 0) {
        showMarkersOnly();
        return;
      }

      const google = window.google;

      const originAddress = new google.maps.LatLng(
        userLocation.lat,
        userLocation.lng
      );
      const destinationAddress = `${
        blocks[blocks.length - 1].address
      }, Singapore`;

      const waypoints = blocks.slice(0, -1).map((block) => ({
        location: `${block.address}, Singapore`,
        stopover: true,
      }));

      const request = {
        origin: originAddress,
        destination: destinationAddress,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      directionsServiceRef.current.route(
        request,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any, status: any) => {
          if (status === "OK") {
            directionsRendererRef.current.setDirections(result);
          } else {
            console.error("Directions request failed:", status);
            showMarkersOnly();
          }
        }
      );
    };

    const showMarkersOnly = () => {
      const google = window.google;
      const bounds = new google.maps.LatLngBounds();

      blocks.forEach((block, index) => {
        const geocoder = new google.maps.Geocoder(); // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geocoder.geocode(
          { address: `${block.address}, Singapore` },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (results: any, status: any) => {
            if (status === "OK" && results[0]) {
              new google.maps.Marker({
                position: results[0].geometry.location,
                map: googleMapRef.current,
                label: {
                  text: `${index + 1}`,
                  color: "white",
                  fontWeight: "bold",
                },
                title: block.number,
              });

              bounds.extend(results[0].geometry.location);

              if (index === blocks.length - 1) {
                googleMapRef.current.fitBounds(bounds);
              }
            }
          }
        );
      });

      if (userLocation) {
        new google.maps.Marker({
          position: new google.maps.LatLng(userLocation.lat, userLocation.lng),
          map: googleMapRef.current,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "#FF5B49",
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8,
          },
          title: "Your Location",
        });
        bounds.extend(
          new google.maps.LatLng(userLocation.lat, userLocation.lng)
        );
        googleMapRef.current.fitBounds(bounds);
      } else if (blocks.length === 0) {
        googleMapRef.current.setCenter({ lat: 1.3521, lng: 103.8198 });
      }
    };

    loadGoogleMaps();
  }, [blocks, userLocation]);

  return <div ref={mapRef} className="w-full h-96 rounded-xl" />;
}

export default function Routes({ onScanClick }: HeaderProps) {
  const [showScan, setShowScan] = useState(false);
  const [shops] = useState<Shop[]>([
    {
      id: 1,
      name: "Speciality Route",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2",
      points: 10,
      blocks: [
        { id: "1-1", number: "#01-20", address: "Blk 354 Clementi Ave 2" },
        { id: "1-2", number: "#01-21", address: "Blk 355 Clementi Ave 2" },
        { id: "1-3", number: "#01-54", address: "Blk 356 Clementi Ave 2" },
      ],
    },
    {
      id: 2,
      name: "Grocery Route",
      image: "shops/shrimphub.jpg",
      location: "Jurong West St 52",
      points: 20,
      blocks: [
        { id: "2-1", number: "#01-10", address: "Blk 501 Jurong West St 52" },
        { id: "2-2", number: "#01-15", address: "Blk 502 Jurong West St 52" },
        { id: "2-3", number: "#01-28", address: "Blk 503 Jurong West St 52" },
        { id: "2-4", number: "#01-32", address: "Blk 504 Jurong West St 52" },
      ],
    },
    {
      id: 3,
      name: "Fashion Route",
      image: "shops/shrimphub.jpg",
      location: "Bukit Batok Central",
      points: 15,
      blocks: [
        { id: "3-1", number: "#01-05", address: "Blk 158 Bukit Batok St 11" },
        { id: "3-2", number: "#01-12", address: "Blk 159 Bukit Batok St 11" },
        { id: "3-3", number: "#01-18", address: "Blk 160 Bukit Batok St 11" },
      ],
    },
    {
      id: 4,
      name: "Mom & Pop Route",
      image: "shops/shrimphub.jpg",
      location: "Toa Payoh Lor 8",
      points: 50,
      blocks: [
        { id: "4-1", number: "#01-08", address: "Blk 78 Toa Payoh Lor 8" },
        { id: "4-2", number: "#01-14", address: "Blk 79 Toa Payoh Lor 8" },
        { id: "4-3", number: "#01-22", address: "Blk 80 Toa Payoh Lor 8" },
        { id: "4-4", number: "#01-30", address: "Blk 81 Toa Payoh Lor 8" },
        { id: "4-5", number: "#01-45", address: "Blk 82 Toa Payoh Lor 8" },
      ],
    },
    {
      id: 5,
      name: "Foodie Route",
      image: "shops/shrimphub.jpg",
      location: "Bedok North St 1",
      points: 30,
      blocks: [
        { id: "5-1", number: "#01-03", address: "Blk 538 Bedok North St 1" },
        { id: "5-2", number: "#01-11", address: "Blk 539 Bedok North St 1" },
        { id: "5-3", number: "#01-25", address: "Blk 540 Bedok North St 1" },
      ],
    },
  ]);

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location access denied or unavailable", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedShop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedShop]);

  const getMultiStopGoogleMapsUrl = (
    blocks: Block[],
    userLocation: { lat: number; lng: number } | null
  ) => {
    if (blocks.length === 0) return "";

    const baseMapsUrl =
      "https://www.google.com/maps/dir/?api=1&travelmode=walking";

    const origin = userLocation
      ? `${userLocation.lat},${userLocation.lng}`
      : "Current+Location";
    const originParam = `&origin=${origin}`;

    const destinationAddress = `${
      blocks[blocks.length - 1].address
    }, Singapore`;
    const destinationParam = `&destination=${encodeURIComponent(
      destinationAddress
    )}`;

    const waypoints = blocks
      .slice(0, -1)
      .map((block) => `${block.address}, Singapore`)
      .join("|");
    const waypointsParam = waypoints
      ? `&waypoints=${encodeURIComponent(waypoints)}`
      : "";

    const travelModeParam = "&travelmode=walking";

    return `${baseMapsUrl}${originParam}${destinationParam}${waypointsParam}${travelModeParam}`;
  };

  const handleStartRoute = (shop: Shop) => {
    const mapsUrl = getMultiStopGoogleMapsUrl(shop.blocks, userLocation);
    if (mapsUrl) {
      window.open(mapsUrl, "_blank");
    }
  };

  return (
    <>
      <div className="mx-auto w-[88%] mt-4 flex flex-col gap-3 font-poppins">
        <div className="flex flex-col gap-4 mb-4">
          {shops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => setSelectedShop(shop)}
              className="flex flex-row gap-3 p-2 items-center bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
            >
              <img
                src={shop.image}
                alt={shop.name}
                className="size-[90px] object-cover rounded-lg"
              />
              <div className="flex flex-col gap-1 items-start font-poppins text-[#6F7789] justify-start">
                <div className="font-semibold text-lg text-black">
                  {shop.name}
                </div>
                <div className="text-xs flex flex-row gap-1.5 items-center">
                  <Icon
                    icon="mingcute:location-fill"
                    width="18"
                    height="18"
                    style={{ color: "#FF5B49" }}
                  />
                  <div>{shop.location}</div>
                </div>
                <div className="text-xs flex flex-row gap-1.5 items-center">
                  <img src="points.png" className="size-4.5" alt="Points" />
                  <div className="font-semibold">{shop.points}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedShop && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto overflow-x-hidden">
          <button
            onClick={() => setSelectedShop(null)}
            className="absolute left-5 top-12 bg-white rounded-full w-10 h-10 flex items-center justify-center z-[60] shadow-md"
          >
            <Icon
              icon="weui:back-filled"
              width="18"
              height="18"
              style={{ color: "black" }}
            />
          </button>

          <div className="pt-20 px-6 pb-8">
            <div className="mb-6">
              <RouteMap
                blocks={selectedShop.blocks}
                userLocation={userLocation}
                shopName={selectedShop.name}
              />
            </div>

            <h2 className="text-2xl font-bold mb-2 font-poppins">
              {selectedShop.name}
            </h2>

            <div className="flex items-center gap-2 text-gray-600 mb-2 font-poppins">
              <Icon
                icon="mingcute:location-fill"
                width="20"
                height="20"
                style={{ color: "#FF5B49" }}
              />
              <span>
                {selectedShop.blocks.length} Stops starting near{" "}
                {selectedShop.location}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6 font-poppins">
              <img src="points.png" className="size-5" alt="Points" />
              <span className="font-semibold text-lg">
                {selectedShop.points} points
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3 font-poppins">
                Route Stops
              </h3>
              <ol className="list-decimal pl-5 text-gray-700 space-y-2 font-poppins">
                {selectedShop.blocks.map((block) => (
                  <li key={block.id}>
                    <span className="font-medium">{block.address}</span>, Unit{" "}
                    {block.number}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 font-poppins">
              <button
                onClick={() => handleStartRoute(selectedShop)}
                className="w-full bg-[#4285F4] text-white py-3 px-4 rounded-2xl font-semibold text-center flex items-center justify-center gap-2 hover:bg-[#3476E9] transition-colors"
              >
                <Icon icon="mdi:directions" width="24" height="24" />
                Start Route
              </button>
            </div>

            <div className="mt-4 font-poppins">
              <button
                onClick={() => setShowScan(true)}
                className="w-full bg-[#FF5B49] text-white py-3 px-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Icon icon="mdi:line-scan" width="24" height="24" />
                Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {showScan && <Scan onClose={() => setShowScan(false)} />}
    </>
  );
}
