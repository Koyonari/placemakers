import { Icon } from "@iconify/react";
import { useState, useRef } from "react";
import { useRewards } from "@/lib/rewards-context";

export default function PointsEarned() {
  const [showAll, setShowAll] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const { rewards } = useRewards();

  const displayedRewards = showAll ? rewards : rewards.slice(0, 2);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
      setTimeout(() => {
        if (componentRef.current) {
          const elementPosition =
            componentRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      setShowAll(false);
    }
  };

  return (
    <div
      ref={componentRef}
      className="mx-auto w-[88%] flex flex-col p-3 gap-6 bg-white rounded-xl mt-9"
    >
      <div className="flex flex-row justify-between">
        <div className="font-poppins font-semibold text-[15px]">
          Recent points earned
        </div>
        <button
          onClick={handleToggle}
          className="font-poppins text-[13px] text-[#FF5B49] cursor-pointer"
        >
          {showAll ? "Show less" : "See all"}
        </button>
      </div>
      {/* Reward List */}
      <div className="flex flex-col gap-3">
        {displayedRewards.map((reward) => (
          <div
            key={reward.id}
            className="flex flex-row justify-between items-center"
          >
            <div className="flex flex-row gap-4.5 items-center">
              <Icon icon={reward.icon} width="30" height="30" />
              <div className="flex flex-col gap-1">
                <div className="font-poppins font-semibold text-[12px]">
                  {reward.title}
                </div>
                <div className="font-poppins text-[11px] gap-0 flex flex-col leading-3.5">
                  <div>{reward.location}</div>
                  <div>
                    {reward.road}, {reward.unit}
                  </div>
                </div>
                <div className="font-poppins text-[11px]">{reward.date}</div>
              </div>
            </div>
            <div className="border border-[#000000]/30 rounded-3xl p-2 flex flex-row items-center gap-1 max-w-20 min-w-20 h-9">
              <img
                src="points.png"
                alt="points"
                className="size-5 object-cover"
              />
              <div className="font-poppins text-[14px]">+ {reward.points}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
