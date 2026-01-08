import { useState, useRef } from "react";

export default function Purchased() {
  const [showAll, setShowAll] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const allRewards = [
    {
      id: 1,
      icon: "flat-color-icons:shop",
      title: "Aquarium Supplies",
      location: "LFS Aquarium",
      road: "328 Clementi Ave 2",
      unit: "#01-186",
      date: "Jan 6, 2026",
      points: 35,
    },
    {
      id: 2,
      icon: "flat-color-icons:shop",
      title: "Fish Food Bundle",
      location: "Polyart Aquarium",
      road: "Block 328 Clementi Ave 2",
      unit: "#01-194",
      date: "Jan 5, 2026",
      points: 40,
    },
    {
      id: 3,
      icon: "flat-color-icons:shop",
      title: "Groceries Pack",
      location: "Sheng Siong Supermarket",
      road: "352 Clementi Ave 2",
      unit: "#01-91/93/95/97/99",
      date: "Jan 4, 2026",
      points: 50,
    },
    {
      id: 4,
      icon: "flat-color-icons:shop",
      title: "Bouquet Purchase",
      location: "Tian Tian Flower Clementi",
      road: "352 Clementi Ave 2",
      unit: "#01-117",
      date: "Jan 3, 2026",
      points: 45,
    },
    {
      id: 5,
      icon: "flat-color-icons:shop",
      title: "Bicycle Repair",
      location: "Send Itt",
      road: "Block 354 Clementi Ave 2",
      unit: "#01-179",
      date: "Jan 2, 2026",
      points: 30,
    },
];


  const rewards = showAll ? allRewards : allRewards.slice(0, 2);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
      setTimeout(() => {
        if (componentRef.current) {
          const elementPosition = componentRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 20;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      setShowAll(false);
    }
  };

  return (
    <div ref={componentRef} className="mx-auto w-[88%] flex flex-col p-3 gap-6 bg-white rounded-xl mt-3">
      <div className="flex flex-row justify-between">
        <div className="font-poppins font-semibold text-[15px]">Recent purchased</div>
        <button
          onClick={handleToggle}
          className="font-poppins text-[13px] text-[#FF5B49] cursor-pointer"
        >
          {showAll ? "Show less" : "See all"}
        </button>
      </div>
      {/* Reward List */}
      <div className="flex flex-col gap-3">
        {rewards.map((reward) => (
          <div key={reward.id} className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4.5 items-center">
              <img src="items/kettle.jpg" className="object-cover size-16" alt="Item"/>
              <div className="flex flex-col gap-1">
                <div className="font-poppins font-semibold text-[12px]">{reward.title}</div>
                <div className="font-poppins text-[11px] gap-0 flex flex-col leading-3.5">
                  <div>{reward.location}</div>
                  <div>{reward.road}, {reward.unit}</div>
                </div>
                <div className="font-poppins text-[11px]">{reward.date}</div>
              </div>
            </div>
            <div className="border border-[#000000]/30 rounded-3xl p-2 flex flex-row items-center gap-1 px-4 h-9">
              <div className="font-poppins text-[14px]">$28</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
