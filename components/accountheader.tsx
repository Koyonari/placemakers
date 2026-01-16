import { Icon } from "@iconify/react";
import { usePoints } from "@/lib/points-context";
import { useState, useEffect } from "react";

export default function AccountHeader() {
  const { points, tier } = usePoints();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxPoints = 5000;
  const percentage = (points / maxPoints) * 100;

  const getTierColor = (tierType: string) => {
    switch (tierType) {
      case "silver":
        return "#C0C0C0";
      case "gold":
        return "#FFD700";
      case "diamond":
        return "#00CED1";
      default:
        return "#C0C0C0";
    }
  };

  const getTierLabel = (tierType: string) => {
    return tierType.charAt(0).toUpperCase() + tierType.slice(1);
  };

  const getNextTier = (currentTier: string) => {
    const tierProgression = ["silver", "gold", "diamond"];
    const currentIndex = tierProgression.indexOf(currentTier);
    if (currentIndex < tierProgression.length - 1) {
      return tierProgression[currentIndex + 1];
    }
    return currentTier;
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <div className="w-[88%] flex flex-col mx-auto mt-10 gap-8">
      <div className="flex justify-between flex-row">
        <div className="font-semibold text-[24px] text-[#131313] font-poppins">
          Your Account
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-11 h-11 bg-[#FF5B49] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF6B59] transition-colors"
        >
          <Icon
            icon="material-symbols:settings-rounded"
            width="26"
            height="26"
            style={{ color: "#FFFFFF" }}
          />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="items-start font-roboto font-semibold text-[25px]">
          {points} pts
        </div>
        <div className="relative">
          <div className="rounded-3xl w-full bg-[#F5F5F5] h-7 border border-[#000000]/30 flex items-center pr-2">
            <div
              className="rounded-3xl h-full bg-[#FFD700] border-2 border-[#FFD700] transition-all duration-300 flex items-center justify-end pr-1"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2 text-[12px] text-[#767676] font-poppins">
            <span className="flex items-center flex-row gap-1">
              {tier === "diamond" ? (
                "Max Tier"
              ) : (
                <>
                  <Icon
                    icon="mdi:diamond"
                    width="14"
                    height="14"
                    style={{ color: getTierColor(tier) }}
                  />
                  {getTierLabel(tier)}
                </>
              )}
            </span>
            <span className="flex items-center gap-1">
              {tier === "diamond" ? (
                "Max Tier"
              ) : (
                <>
                  {Math.round(percentage)}% to
                  <Icon
                    icon="mdi:diamond"
                    width="14"
                    height="14"
                    style={{ color: getTierColor(getNextTier(tier)) }}
                  />
                  {getTierLabel(getNextTier(tier))} tier
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="min-h-full w-[88%] mx-auto relative pb-8">
            {/* Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute left-0 top-12 bg-white rounded-full w-10 h-10 flex items-center justify-center z-[60] shadow-md"
            >
              <Icon
                icon="weui:back-filled"
                width="18"
                height="18"
                style={{ color: "black" }}
              />
            </button>

            <div className="font-semibold text-[24px] text-[#131313] font-poppins pt-24">
              Account Settings
            </div>

            <div className="flex flex-col gap-6 font-poppins mt-8">
              {/* Privacy & Data Sharing */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="text-[#FF5B49] font-semibold text-lg">
                    Share demographics with shops
                  </div>
                  <div className="text-[#131313] text-base">
                    Allow shops to view your age, gender, and area
                  </div>
                </div>
                <label className="relative inline-block w-14 h-8 flex-shrink-0">
                  <input type="checkbox" className="sr-only peer" />
                  <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[#FF5B49] before:content-[''] before:absolute before:h-6 before:w-6 before:left-1 before:top-1 before:bg-white before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></span>
                </label>
              </div>

              {/* Purchase History Sharing */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="text-[#FF5B49] font-semibold text-lg">
                    Share shopping preferences
                  </div>
                  <div className="text-[#131313] text-base">
                    Help shops recommend better deals for you
                  </div>
                </div>
                <label className="relative inline-block w-14 h-8 flex-shrink-0">
                  <input type="checkbox" className="sr-only peer" />
                  <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[#FF5B49] before:content-[''] before:absolute before:h-6 before:w-6 before:left-1 before:top-1 before:bg-white before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></span>
                </label>
              </div>

              {/* Location Services */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="text-[#FF5B49] font-semibold text-lg">
                    Location services
                  </div>
                  <div className="text-[#131313] text-base">
                    Find nearby shops and bonus point routes
                  </div>
                </div>
                <label className="relative inline-block w-14 h-8 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[#FF5B49] before:content-[''] before:absolute before:h-6 before:w-6 before:left-1 before:top-1 before:bg-white before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></span>
                </label>
              </div>

              {/* Points Notifications */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="text-[#FF5B49] font-semibold text-lg">
                    Points & rewards alerts
                  </div>
                  <div className="text-[#131313] text-base">
                    Get notified about bonus routes and deals
                  </div>
                </div>
                <label className="relative inline-block w-14 h-8 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[#FF5B49] before:content-[''] before:absolute before:h-6 before:w-6 before:left-1 before:top-1 before:bg-white before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></span>
                </label>
              </div>

              {/* Order Updates */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="text-[#FF5B49] font-semibold text-lg">
                    Order status notifications
                  </div>
                  <div className="text-[#131313] text-base">
                    Updates on online orders and collection times
                  </div>
                </div>
                <label className="relative inline-block w-14 h-8 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[#FF5B49] before:content-[''] before:absolute before:h-6 before:w-6 before:left-1 before:top-1 before:bg-white before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></span>
                </label>
              </div>

              {/* Personalized Deals */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="text-[#FF5B49] font-semibold text-lg">
                    Personalized deal suggestions
                  </div>
                  <div className="text-[#131313] text-base">
                    See deals based on your shopping habits
                  </div>
                </div>
                <label className="relative inline-block w-14 h-8 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[#FF5B49] before:content-[''] before:absolute before:h-6 before:w-6 before:left-1 before:top-1 before:bg-white before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
