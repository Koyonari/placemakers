"use client";

import ShopHeader from "@/components/shopheader";
import Shop from "@/components/shop";

export default function Home() {
  return (
    <div className = "min-h-screen flex flex-col bg-gradient-to-b from-white to-[#EAEAEA] pb-24">
      <ShopHeader />
      <Shop />
    </div>
  )
}
