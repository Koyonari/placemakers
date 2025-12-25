import { Icon } from "@iconify/react";
export default function AccountHeader() {
  const currentPoints = 1214;
  const maxPoints = 5000;
  const percentage = (currentPoints / maxPoints) * 100;

  return (
    <div className="w-[88%] flex flex-col mx-auto mt-10 gap-8">
      <div className="flex justify-between flex-row">
        <div className="font-semibold text-[24px] text-[#131313] font-poppins">Your Account</div>
        <div className="w-11 h-11 bg-[#FF5B49] rounded-full flex items-center justify-center">
          <Icon icon="material-symbols:settings-rounded" width="26" height="26" style={{ color: '#FFFFFF'}}/>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="items-start font-inter font-semibold text-[25px]">{currentPoints.toLocaleString()} pts</div>
        <div className="rounded-3xl w-full bg-[#F5F5F5] h-7  border border-[#000000]/30">
          <div 
            className="rounded-3xl h-full bg-[#FF5B49]  border-2 border-[#FF5B49] transition-all duration-300" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
