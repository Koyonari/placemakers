import { Icon } from "@iconify/react";

interface HeaderProps {
  onScanClick: () => void;
}

export default function Header({ onScanClick }: HeaderProps) {
  return (
    <div className="w-[88%] flex flex-col mx-auto mt-10">
      <div className="flex justify-between flex-row">
        <div className="font-semibold text-[24px] text-[#131313] font-poppins">Explore Clementi!</div>
        {/* Scan Btn */}
        <button 
          onClick={onScanClick}
          className="w-11 h-11 bg-[#FF5B49] rounded-full flex items-center justify-center"
        >
          <Icon icon="mdi:line-scan" width="26" height="26" style={{ color: '#FFFFFF' }} />
        </button>
      </div>
      <div className="flex flex-row gap-1.5 items-center mt-[-5px]">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.15" fillRule="evenodd" clipRule="evenodd" d="M13 22.75C17.7865 20.5833 21.6667 16.7031 21.6667 11.9167C21.6667 7.1302 17.7865 3.25 13 3.25C8.21354 3.25 4.33334 7.1302 4.33334 11.9167C4.33334 16.7031 8.21354 20.5833 13 22.75ZM13 15.1667C14.7949 15.1667 16.25 13.7116 16.25 11.9167C16.25 10.1217 14.7949 8.66667 13 8.66667C11.2051 8.66667 9.75001 10.1217 9.75001 11.9167C9.75001 13.7116 11.2051 15.1667 13 15.1667Z" fill="#FF5B49" />
          <path d="M21.6667 11.9167C21.6667 16.7031 17.7865 20.5833 13 22.75C8.21354 20.5833 4.33334 16.7031 4.33334 11.9167C4.33334 7.1302 8.21354 3.25 13 3.25C17.7865 3.25 21.6667 7.1302 21.6667 11.9167Z" fill="#FF5B49" />
          <path d="M16.25 11.9167C16.25 13.7116 14.7949 15.1667 13 15.1667C11.2051 15.1667 9.75001 13.7116 9.75001 11.9167C9.75001 10.1217 11.2051 8.66667 13 8.66667C14.7949 8.66667 16.25 10.1217 16.25 11.9167Z" fill="#FF5B49" />
          <circle cx="13" cy="13" r="3.25" fill="white" />
        </svg>
        <div className="text-[22px] text-[#606060] font-roboto">Clementi Ave 2</div>
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.72475 7.30549C3.94663 7.06141 4.29385 7.03922 4.53853 7.23892L4.60863 7.30549L10 13.2357L15.3914 7.30549C15.6133 7.06141 15.9605 7.03922 16.2052 7.23892L16.2753 7.30549C16.4972 7.54957 16.5174 7.93151 16.3358 8.20065L16.2753 8.27776L10.442 14.6944C10.2201 14.9385 9.87285 14.9607 9.62818 14.761L9.55808 14.6944L3.72475 8.27776C3.48067 8.00928 3.48067 7.57398 3.72475 7.30549Z" fill="#FF5B49" />
        </svg>
      </div>
    </div>
  );
}
