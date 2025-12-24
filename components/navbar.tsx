import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Navbar() {
  const [selected, setSelected] = useState(0);

  const navItems = [
    { icon: "material-symbols:home-rounded" },
    { icon: "hugeicons:discover-circle" },
    { icon: "fluent-mdl2:shopping-cart" },
    { icon: "lineicons:route-1" },
    { icon: "iconamoon:profile" }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-row rounded-[36px] justify-between py-[12px] px-[18px] shadow-xl bg-white w-[88%] z-50">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => setSelected(index)}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            selected === index ? 'bg-[#FF5B49]' : ''
          }`}
        >
          <Icon
            icon={item.icon}
            style={{ 
              color: selected === index ? '#FFFFFF' : '#AEAEB2', 
              height: '24px', 
              width: '24px'
            }}
          />
        </button>
      ))}
    </div>
  );
}
