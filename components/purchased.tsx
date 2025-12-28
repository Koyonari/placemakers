import { useState, useRef } from "react";

export default function Purchased() {
  const [showAll, setShowAll] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const allRewards = [
    {
      id: 1,
      icon: "flat-color-icons:shop",
      title: "Smart Kettle",
      location: "Happy Mart @",
      road: "Clementi Blk 123",
      unit: "#01-45",
      date: "Dec 5, 2025",
      points: 40
    },
    {
      id: 2,
      icon: "flat-color-icons:shop",
      title: "Smart Kettle",
      location: "FairPrice @",
      road: "Clementi Blk 321",
      unit: "#02-12",
      date: "Dec 3, 2025",
      points: 50
    },
    {
      id: 3,
      icon: "flat-color-icons:shop",
      title: "Smart Kettle",
      location: "Sheng Siong @",
      road: "Jurong Blk 456",
      unit: "#01-23",
      date: "Dec 1, 2025",
      points: 35
    },
    {
      id: 4,
      icon: "flat-color-icons:shop",
      title: "Smart Kettle",
      location: "Giant @",
      road: "Tampines Blk 789",
      unit: "#03-56",
      date: "Nov 28, 2025",
      points: 42
    },
    {
      id: 5,
      icon: "flat-color-icons:shop",
      title: "Smart Kettle",
      location: "Cold Storage @",
      road: "Orchard Plaza",
      unit: "#B1-12",
      date: "Nov 25, 2025",
      points: 38
    }
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
