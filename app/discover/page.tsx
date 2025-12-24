'use client'
import Header from "@/components/header";
import Searchbar from "@/components/searchbar";
import Points from "@/components/points";
import ExploreShops from "@/components/exploreshops";
import ExploreDeals from "@/components/exploredeals";
import Navbar from "@/components/navbar";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#EAEAEA]">
      <Header />
      <Searchbar />
      <div className="h-2"></div>
      <Points />
      <ExploreDeals />
      <ExploreShops />
      <Navbar />
    </div>
  );
}
