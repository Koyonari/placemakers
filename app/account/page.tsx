"use client";
import AccountHeader from "@/components/accountheader";
import PointsEarned from "@/components/pointsearned";
import PointsRedeemed from "@/components/pointsredeemed";
import Purchased from "@/components/purchased";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#EAEAEA] pb-24">
      <AccountHeader />
      <PointsEarned />
      <PointsRedeemed />
      <Purchased />
    </div>
  );
}
