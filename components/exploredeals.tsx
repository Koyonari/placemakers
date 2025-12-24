import { useState } from 'react';

export default function ExploreDeals() {
  const [showAll, setShowAll] = useState(false);
  
  const deals = [
    {
      id: 1,
      image: "deals/deal1.png",
      title: "Ban Joo Tong",
      points: 500
    },
    {
      id: 2,
      image: "deals/deal2.png",
      title: "John's Provision",
      points: 750
    },
    {
      id: 3,
      image: "deals/deal1.png",
      title: "Ming TCM",
      points: 1000
    },
    {
      id: 4,
      image: "deals/deal2.png",
      title: "Health is Wealth",
      points: 1250
    },
    {
      id: 5,
      image: "deals/deal2.png",
      title: "Health is Wealth",
      points: 1250
    }
  ];

  if (showAll) {
    return (
      <div className="mx-auto w-[88%]">
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="font-poppins font-semibold text-xl">Explore Deals</div>
          <div 
            className="font-poppins text-[14px] font-medium text-[#FF5B49] cursor-pointer hover:underline"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </div>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="relative rounded-[24px] overflow-hidden"
                style={{ width: '164px', height: '240px' }}
              >
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 font-roboto text-white font-semibold flex flex-col gap-1">
                  <div className="rounded-[60px] bg-[#545454] text-sm py-1 px-3 w-fit">
                    {deal.title}
                  </div>
                  <div className="rounded-[60px] bg-[#545454] gap-2 py-1 px-3 flex flex-row items-center w-fit">
                    <img
                      src="points.png"
                      alt="Points"
                      className="size-[14px]"
                    />
                    <div className="text-sm">{deal.points}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mx-auto w-[88%] mt-4">
        <div className="font-poppins font-semibold text-xl">Explore Deals</div>
        <div 
          className="font-poppins text-[14px] font-medium text-[#FF5B49] cursor-pointer hover:underline"
          onClick={() => setShowAll(true)}
        >
          View All
        </div>
      </div>
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mt-4">
        <div className="flex flex-row gap-3 pl-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="relative rounded-[24px] overflow-hidden flex-shrink-0"
              style={{ width: '164px', height: '240px' }}
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 font-roboto text-white font-semibold flex flex-col gap-1">
                <div className="rounded-[60px] bg-[#545454] text-sm py-1 px-3 w-fit">
                  {deal.title}
                </div>
                <div className="rounded-[60px] bg-[#545454] gap-2 py-1 px-3 flex flex-row items-center w-fit">
                  <img
                    src="points.png"
                    alt="Points"
                    className="size-[14px]"
                  />
                  <div className="text-sm">{deal.points}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-[5px]"></div>
        </div>
      </div>
    </div>
  );
}
