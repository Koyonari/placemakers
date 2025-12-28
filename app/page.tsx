"use client";
import { useState } from "react";
import Header from "@/components/header";
import Searchbar from "@/components/searchbar";
import Categories from "@/components/categories";
import ExploreShops from "@/components/exploreshops";
import ExploreDeals from "@/components/exploredeals";
import Scan from "@/components/scan";

export default function Home() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#EAEAEA] pb-24">
      <Header onScanClick={() => setShowScanner(true)} />
      <Searchbar />
      <Categories />
      <ExploreDeals />
      <ExploreShops />
      {showScanner && <Scan onClose={() => setShowScanner(false)} />}
    </div>
  );
}
