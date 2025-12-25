import { Icon } from "@iconify/react";

export default function ShopHeader() {
  return (
    <div className="w-[88%] mx-auto flex flex-row justify-between mt-10">
      <div className="font-semibold text-[24px] text-[#131313] font-poppins">Online Shop</div>
      <div className="relative">
        <div className="bg-[#FF5B49] rounded-full p-3 size-12 flex items-center justify-center">
          <Icon
            icon="fluent-mdl2:shopping-cart"
            style={{
              color: "#FFFFFF",
              height: "32px",
              width: "32px",
            }}
          />
        </div>
        <div className="absolute -bottom-[4.5px] -right-[4.5px] bg-[#535353] rounded-full w-5 h-5 flex items-center justify-center align-center text-white text-xs font-poppins font-semibold">
          3
        </div>
      </div>
    </div>
  )
}
