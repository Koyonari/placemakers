import {Icon} from "@iconify/react";
import { useState } from "react";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <div className = "w-[88%] flex flex-row mx-auto mt-6 py-3.5 px-3 items-center align-center bg-[#EAEAEA] rounded-[50px] justify-between">
      <div className = "flex flex-row gap-4 align-center items-center flex-1 min-w-0">
        <Icon icon="mingcute:search-line" width="24" height="24" className = "text-[#BEBEBE] ml-2 flex-shrink-0"/>
        <input 
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search here"
          className="text-[20px] text-[#333333] placeholder:text-[#BEBEBE] font-poppins bg-transparent outline-none flex-1 min-w-0"
        />
      </div>
      <Icon icon="mage:filter" width="24" height="24" className="text-[#BEBEBE] flex-shrink-0"/>
    </div>
  )
}
