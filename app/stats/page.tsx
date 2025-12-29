"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface Customer {
  id: number;
  age: number;
  gender: string;
  location: string;
  visits: number;
  pointsEarned: number;
  rewardsRedeemed: number;
}

interface Shop {
  name: string;
  address: string;
}

export default function StatsPage() {
  // Mock customer data from the web app
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      age: 28,
      gender: "Female",
      location: "Clementi",
      visits: 12,
      pointsEarned: 620,
      rewardsRedeemed: 2,
    },
    {
      id: 2,
      age: 34,
      gender: "Male",
      location: "Clementi",
      visits: 8,
      pointsEarned: 440,
      rewardsRedeemed: 1,
    },
    {
      id: 3,
      age: 22,
      gender: "Female",
      location: "Jurong",
      visits: 15,
      pointsEarned: 750,
      rewardsRedeemed: 3,
    },
    {
      id: 4,
      age: 45,
      gender: "Male",
      location: "Clementi",
      visits: 6,
      pointsEarned: 280,
      rewardsRedeemed: 1,
    },
    {
      id: 5,
      age: 31,
      gender: "Female",
      location: "Tampines",
      visits: 10,
      pointsEarned: 520,
      rewardsRedeemed: 2,
    },
    {
      id: 6,
      age: 26,
      gender: "Female",
      location: "Clementi",
      visits: 14,
      pointsEarned: 680,
      rewardsRedeemed: 2,
    },
    {
      id: 7,
      age: 38,
      gender: "Male",
      location: "Bukit Merah",
      visits: 7,
      pointsEarned: 350,
      rewardsRedeemed: 1,
    },
    {
      id: 8,
      age: 24,
      gender: "Male",
      location: "Clementi",
      visits: 11,
      pointsEarned: 590,
      rewardsRedeemed: 2,
    },
    {
      id: 9,
      age: 52,
      gender: "Female",
      location: "Clementi",
      visits: 5,
      pointsEarned: 220,
      rewardsRedeemed: 0,
    },
    {
      id: 10,
      age: 29,
      gender: "Male",
      location: "Clementi",
      visits: 9,
      pointsEarned: 480,
      rewardsRedeemed: 1,
    },
    {
      id: 11,
      age: 27,
      gender: "Female",
      location: "West Coast",
      visits: 13,
      pointsEarned: 650,
      rewardsRedeemed: 2,
    },
    {
      id: 12,
      age: 35,
      gender: "Male",
      location: "Clementi",
      visits: 7,
      pointsEarned: 360,
      rewardsRedeemed: 1,
    },
  ]);

  const shop: Shop = {
    name: "ShrimpHub",
    address: "Clementi Ave 2, #01-197",
  };

  // Calculate demographics from customer data
  const ageGroups = [
    {
      range: "18-25",
      data: customers.filter((c) => c.age >= 18 && c.age <= 25),
    },
    {
      range: "26-35",
      data: customers.filter((c) => c.age >= 26 && c.age <= 35),
    },
    {
      range: "36-45",
      data: customers.filter((c) => c.age >= 36 && c.age <= 45),
    },
    {
      range: "46-55",
      data: customers.filter((c) => c.age >= 46 && c.age <= 55),
    },
    { range: "55+", data: customers.filter((c) => c.age > 55) },
  ];

  const genderData = {
    female: customers.filter((c) => c.gender === "Female").length,
    male: customers.filter((c) => c.gender === "Male").length,
  };

  const locationData = customers.reduce((acc, c) => {
    const existing = acc.find((item) => item.location === c.location);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ location: c.location, count: 1 });
    }
    return acc;
  }, [] as { location: string; count: number }[]);

  const totalVisits = customers.reduce((sum, c) => sum + c.visits, 0);
  const avgPointsPerVisit = Math.round(
    customers.reduce((sum, c) => sum + c.pointsEarned, 0) / totalVisits
  );
  const repeatCustomers = customers.filter((c) => c.visits > 1).length;
  const repeatRate = Math.round((repeatCustomers / customers.length) * 100);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-[#EAEAEA] pb-32 px-4 pt-8 md:px-8 md:pt-8 relative z-50">
      {/* Header with Shop Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#131313] font-poppins mb-2">
            Shop Analytics
          </h1>
          <p className="text-[#606060] text-sm md:text-base font-poppins">
            Customer Demographics & Insights
          </p>
        </div>
        {/* Shop Name and Address - Top Right */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 md:w-auto w-full">
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:store"
              width="28"
              height="28"
              className="text-[#FF5B49] shrink-0"
            />
            <div>
              <p className="font-semibold text-[#131313] font-poppins text-lg">
                {shop.name}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Icon
                  icon="mdi:map-marker"
                  width="16"
                  height="16"
                  className="text-[#FF5B49]"
                />
                <p className="text-sm text-[#606060] font-roboto">
                  {shop.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics - Matching App Design */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm text-[#606060] font-roboto mb-2">
                Total Customers
              </p>
              <p className="text-2xl md:text-3xl font-bold text-[#131313] font-poppins">
                {customers.length}
              </p>
            </div>
            <Icon
              icon="carbon:user-multiple"
              width="24"
              height="24"
              className="text-[#FF5B49]"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm text-[#606060] font-roboto mb-2">
                Repeat Rate
              </p>
              <p className="text-2xl md:text-3xl font-bold text-[#131313] font-poppins">
                {repeatRate}%
              </p>
            </div>
            <Icon
              icon="carbon:repeat"
              width="24"
              height="24"
              className="text-[#FF5B49]"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm text-[#606060] font-roboto mb-2">
                Total Visits
              </p>
              <p className="text-2xl md:text-3xl font-bold text-[#131313] font-poppins">
                {totalVisits}
              </p>
            </div>
            <Icon
              icon="carbon:shopping-catalog"
              width="24"
              height="24"
              className="text-[#FF5B49]"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm text-[#606060] font-roboto mb-2">
                Avg Points/Visit
              </p>
              <p className="text-2xl md:text-3xl font-bold text-[#131313] font-poppins">
                {avgPointsPerVisit}
              </p>
            </div>
            <Icon
              icon="carbon:reward"
              width="24"
              height="24"
              className="text-[#FF5B49]"
            />
          </div>
        </div>
      </div>

      {/* Secondary Grid - Demographics and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Age Demographics - Larger Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold text-[#131313] font-poppins">
              Age Demographics
            </h2>
            <Icon
              icon="carbon:chart-pie"
              width="24"
              height="24"
              className="text-[#FF5B49]"
            />
          </div>

          <div className="space-y-4">
            {ageGroups.map((group) => {
              const percentage = Math.round(
                (group.data.length / customers.length) * 100
              );
              return (
                <div key={group.range}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm md:text-base font-medium text-[#606060] font-roboto">
                      {group.range} years
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-[#131313] font-poppins">
                      {group.data.length} customers ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF5B49] rounded-full transition-all duration-500"
                      style={{ width: `${percentage * 4}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs md:text-sm text-[#606060] font-roboto">
              Your target demographic spans across different age groups with
              diverse customer base.
            </p>
          </div>
        </div>

        {/* Location Distribution */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          <h3 className="text-lg md:text-xl font-bold text-[#131313] font-poppins mb-6 flex items-center gap-2">
            <Icon
              icon="mdi:map-marker"
              width="24"
              height="24"
              className="text-[#FF5B49]"
            />
            Customer Locations
          </h3>

          <div className="space-y-3">
            {locationData
              .sort((a, b) => b.count - a.count)
              .map((loc) => {
                const percentage = Math.round(
                  (loc.count / customers.length) * 100
                );
                return (
                  <div key={loc.location}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-[#606060] font-roboto">
                        {loc.location}
                      </span>
                      <span className="text-xs font-semibold text-[#131313] font-poppins">
                        {loc.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF5B49] rounded-full transition-all duration-500"
                        style={{ width: `${percentage * 4}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Gender and Rewards Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        {/* Gender Distribution */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold text-[#131313] font-poppins">
              Gender Distribution
            </h2>
            <Icon
              icon="carbon:gender-female"
              width="24"
              height="24"
              className="text-[#FF5B49]"
            />
          </div>

          <div className="space-y-4">
            {[
              {
                gender: "Female",
                count: genderData.female,
                icon: "carbon:gender-female",
              },
              {
                gender: "Male",
                count: genderData.male,
                icon: "carbon:gender-male",
              },
            ].map((item) => {
              const percentage = Math.round(
                (item.count / customers.length) * 100
              );
              return (
                <div key={item.gender}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm md:text-base font-medium text-[#606060] font-roboto flex items-center gap-2">
                      <Icon
                        icon={item.icon}
                        width="18"
                        height="18"
                        className="text-[#FF5B49]"
                      />
                      {item.gender}
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-[#131313] font-poppins">
                      {percentage}% ({item.count})
                    </span>
                  </div>
                  <div className="h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF5B49] rounded-full transition-all duration-500"
                      style={{ width: `${percentage * 2}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rewards Redeemed */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold text-[#131313] font-poppins">
              Rewards Engagement
            </h2>
            <Icon
              icon="carbon:reward"
              width="24"
              height="24"
              className="text-[#FF5B49]"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base font-medium text-[#606060] font-roboto">
                Total Rewards Redeemed
              </span>
              <span className="text-2xl md:text-3xl font-bold text-[#131313] font-poppins">
                {customers.reduce((sum, c) => sum + c.rewardsRedeemed, 0)}
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs md:text-sm text-[#606060] font-roboto mb-3">
                Customers with redeemed rewards:{" "}
                <span className="font-semibold text-[#131313]">
                  {customers.filter((c) => c.rewardsRedeemed > 0).length}/
                  {customers.length}
                </span>
              </p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF5B49] rounded-full"
                  style={{
                    width: `${
                      (customers.filter((c) => c.rewardsRedeemed > 0).length /
                        customers.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-bold text-[#131313] font-poppins">
            Top Customers
          </h2>
          <Icon
            icon="carbon:star-filled"
            width="24"
            height="24"
            className="text-[#FF5B49]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#131313] font-poppins">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-semibold text-[#131313] font-poppins">
                  Location
                </th>
                <th className="text-left py-3 px-4 font-semibold text-[#131313] font-poppins">
                  Visits
                </th>
                <th className="text-left py-3 px-4 font-semibold text-[#131313] font-poppins">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {customers
                .sort((a, b) => b.visits - a.visits)
                .slice(0, 5)
                .map((customer, idx) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-[#606060] font-roboto">
                      <span className="font-semibold text-[#131313]">
                        #{idx + 1}
                      </span>{" "}
                      Age {customer.age}
                    </td>
                    <td className="py-3 px-4 text-[#606060] font-roboto">
                      {customer.location}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-[#FFE5E0] text-[#FF5B49] px-3 py-1 rounded-full text-xs font-semibold">
                        {customer.visits}x
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#131313] font-semibold font-poppins">
                      {customer.pointsEarned}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
