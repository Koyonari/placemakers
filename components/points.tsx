"use client";
import { usePoints } from "@/lib/points-context";

export default function Points() {
  const { points } = usePoints();

  return (
    <div className="w-full bg-gradient-to-r from-[#FF402B] to-[#FF9589] p-5 mt-3">
      <div className="flex flex-row gap-2 pl-calc[(100%-88%)/2 - 20px]">
        <img src="points.png" alt="Points" className="size-8" />
        <div className="font-roboto font-bold text-3xl text-white">
          {points} pts
        </div>
      </div>
    </div>
  );
}
