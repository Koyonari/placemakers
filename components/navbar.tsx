"use client";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(0);

  const navItems = useMemo(
    () => [
      { icon: "material-symbols:home-rounded", path: "/" },
      { icon: "hugeicons:discover-circle", path: "/discover" },
      { icon: "fluent-mdl2:shopping-cart", path: "/shop" },
      { icon: "lineicons:route-1", path: "/routes" },
      { icon: "iconamoon:profile", path: "/account" },
    ],
    []
  );

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.path === pathname);
    if (currentIndex !== -1) {
      setSelected(currentIndex);
    }
  }, [pathname, navItems]);

  const handleNavigation = (path: string, index: number) => {
    setSelected(index);
    router.push(path);
  };

  // Hide navbar on stats page
  const isStatsPage = pathname === "/stats";

  if (isStatsPage) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-row rounded-[36px] justify-between py-3 px-[18px] shadow-xl bg-white w-[88%] z-40">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleNavigation(item.path, index)}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            selected === index ? "bg-[#FF5B49]" : ""
          }`}
        >
          <Icon
            icon={item.icon}
            style={{
              color: selected === index ? "#FFFFFF" : "#AEAEB2",
              height: "24px",
              width: "24px",
            }}
          />
        </button>
      ))}
    </div>
  );
}
