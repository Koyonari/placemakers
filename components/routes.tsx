import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Routes() {
  const [shops] = useState([
    {
      id: 1,
      name: "ShrimpHub",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2",
      points: 10,
    },
    {
      id: 2,
      name: "Ocean Delights",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2",
      points: 20,
    },
    {
      id: 3,
      name: "Fresh Catch Market",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2",
      points: 15,
    },
    {
      id: 4,
      name: "Seafood Paradise",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2",
      points: 50,
    },
    {
      id: 5,
      name: "Prawn Palace",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2",
      points: 30,
    },
    {
      id: 6,
      name: "Marine Treasures",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2",
      points: 30,
    },
    {
      id: 7,
      name: "Aqua Fresh",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2",
      points: 20,
    },
    {
      id: 8,
      name: "Golden Shell",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2",
      points: 15,
    },
  ]);

  return (
    <div className="mx-auto w-[88%] mt-4 flex flex-col gap-3">
      {/* Shops list */}
      <div className="flex flex-col gap-4 mb-4">
        {shops.map((shop) => (
          <div
            key={shop.id}
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
  );
}
