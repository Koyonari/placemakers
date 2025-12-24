import { Icon } from "@iconify/react";
import { useState } from "react";

export default function ExploreShops() {
  const [showAll, setShowAll] = useState(false);
  const [shops] = useState([
    {
      id: 1,
      name: "ShrimpHub",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #01-197",
      rating: 4.7
    },
    {
      id: 2,
      name: "Ocean Delights",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #02-35",
      rating: 4.5
    },
    {
      id: 3,
      name: "Fresh Catch Market",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #01-88",
      rating: 4.8
    },
    {
      id: 4,
      name: "Seafood Paradise",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 3, #01-45",
      rating: 4.6
    },
    {
      id: 5,
      name: "Prawn Palace",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 4, #02-12",
      rating: 4.9
    },
    {
      id: 6,
      name: "Marine Treasures",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #01-55",
      rating: 4.4
    },
    {
      id: 7,
      name: "Aqua Fresh",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 5, #03-20",
      rating: 4.7
    },
    {
      id: 8,
      name: "Golden Shell",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #01-99",
      rating: 4.5
    }
  ]);
  
  const displayedShops = showAll ? shops : shops.slice(0, 3);

  return (
    <div className="mx-auto w-[88%] mt-8 flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <div className="font-poppins font-semibold text-xl">Explore Shops</div>
        <div 
          className="font-poppins text-[14px] font-medium text-[#FF5B49] cursor-pointer hover:underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </div>
      </div>
      
      {/* Shops list */}
      <div className="flex flex-col gap-4">
        {displayedShops.map((shop) => (
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
              <div className="font-semibold text-lg text-black">{shop.name}</div>
              <div className="text-xs flex flex-row gap-1.5 items-center">
                <Icon 
                  icon="mingcute:location-fill" 
                  width="18" 
                  height="18" 
                  style={{ color: '#FF5B49' }}
                />
                <div>{shop.location}</div>
              </div>
              <div className="text-xs flex flex-row gap-1.5 items-center">
                <Icon 
                  icon="material-symbols:star-rounded" 
                  width="18" 
                  height="18" 
                  style={{ color: '#FF5B49' }}
                />
                <div className="font-semibold">{shop.rating}</div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Invisible shop container */}
        <div className="flex flex-row gap-3 p-2 items-center opacity-0 pointer-events-none">
          <div className="size-[90px] rounded-lg" />
          <div className="flex flex-col gap-1 items-start font-poppins">
            <div className="font-semibold text-lg">Placeholder</div>
            <div className="text-xs">Placeholder text</div>
            <div className="text-xs">Placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
}
