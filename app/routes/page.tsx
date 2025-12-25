"use client";
import Header from "@/components/header";
import Searchbar from "@/components/searchbar";
import Routes from "@/components/routes";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#EAEAEA] pb-24">
      <Header />
      <Searchbar />
      <Routes />
    </div>
  );
}
