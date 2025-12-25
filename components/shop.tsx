import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Shop() {
  const [items] = useState([
    {
      id: 1,
      name: "Smart Kettle",
      price: 28,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #02-17",
      rating: 4.7
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 45,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #05-123",
      rating: 4.5
    },
    {
      id: 3,
      name: "Desk Lamp",
      price: 35,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #03-45",
      rating: 4.8
    },
    {
      id: 4,
      name: "Coffee Maker",
      price: 68,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #01-89",
      rating: 4.6
    },
    {
      id: 5,
      name: "Coffee Maker",
      price: 68,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #01-89",
      rating: 4.6
    },
    {
      id: 6,
      name: "Coffee Maker",
      price: 68,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #01-89",
      rating: 4.6
    }
  ]);

  return (
    <div className="grid grid-cols-2 gap-3 w-[88%] mx-auto mt-6 mb-2">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col items-center p-3 bg-white rounded-xl">
          <img src={item.image} alt={item.name} className="object-cover aspect-square" />
          <div className="font-poppins items-start mt-2">
            <div className="text-[12px] items-center">{item.name}</div>
            <div className="text-[14px] font-semibold items-center">${item.price}</div>
            <div className="text-[12px] text-[#535865] text-ellipsis overflow-x-hidden line-clamp-1 flex flex-row items-center gap-1 mb-1 mt-0.5">
              <Icon
                icon="mingcute:location-fill"
                width="18"
                height="18"
                style={{ color: "#FF5B49" }}
              />
              <div className="text-ellipsis overflow-x-hidden line-clamp-1">{item.location}</div>
            </div>
            <div className="text-[12px] text-[#535865] flex flex-row items-center gap-1">
              <Icon
                icon="material-symbols:star-rounded"
                width="18"
                height="18"
                style={{ color: "#FF5B49" }}
              />
              <div className="font-medium">{item.rating}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
