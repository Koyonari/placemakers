
import { Icon } from "@iconify/react";

export default function PointsRedeemed() {
  const rewards = [
    {
      id: 1,
      icon: "flat-color-icons:shop",
      title: "Rewards Redeemed",
      location: "Happy Mart @",
      road: "Clementi Blk 123",
      unit: "#01-45",
      date: "Dec 5, 2025",
      points: 40
    },
    {
      id: 2,
      icon: "flat-color-icons:shop",
      title: "Rewards Redeemed",
      location: "FairPrice @",
      road: "Clementi Blk 321",
      unit: "#02-12",
      date: "Dec 3, 2025",
      points: 50
    }
  ];

  return (
    <div className="mx-auto w-[88%] flex flex-col p-3 gap-6 bg-white rounded-xl mt-3">
      <div className="flex flex-row justify-between">
        <div className="font-poppins font-semibold text-[15px]">Recent points redeemed</div>
        <div className="font-poppins text-[13px] text-[#FF5B49]">See all</div>
      </div>
      {/* Reward List */}
      <div className="flex flex-col gap-3">
        {rewards.map((reward) => (
          <div key={reward.id} className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4.5 items-center">
              <Icon icon={reward.icon} width="30" height="30" />
              <div className="flex flex-col gap-1">
                <div className="font-poppins font-semibold text-[12px]">{reward.title}</div>
                <div className="font-poppins text-[11px] gap-0 flex flex-col leading-3.5">
                  <div>{reward.location}</div>
                  <div>{reward.road}, {reward.unit}</div>
                </div>
                <div className="font-poppins text-[11px]">{reward.date}</div>
              </div>
            </div>
            <div className="border border-[#000000]/30 rounded-3xl p-2 flex flex-row items-center gap-1 w-25 h-9">
              <img src="points.png" className="size-5 object-cover" />
              <div className="font-poppins text-[14px]">- {reward.points} pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
