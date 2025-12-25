"use client";
import Header from "@/components/header";
import Searchbar from "@/components/searchbar";
import Categories from "@/components/categories";
import ExploreShops from "@/components/exploreshops";
import ExploreDeals from "@/components/exploredeals";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#EAEAEA] pb-24">
      <Header />
      <Searchbar />
      <Categories />
      <ExploreDeals />
      <ExploreShops />
    </div>
  );
}
