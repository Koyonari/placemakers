import { useState, useEffect } from 'react';

interface Deal {
  id: number;
  image: string;
  title: string;
  points: number;
  description: string;
}

export default function ExploreDeals() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (selectedDeal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDeal]);

  // Reset QR code view when modal closes
  useEffect(() => {
    if (!selectedDeal) {
      setShowQRCode(false);
    }
  }, [selectedDeal]);
  
    const deals: Deal[] = [
    {
      id: 1,
      image: "deals/shengsiongdeals.png",
      title: "Sheng Siong",
      points: 500,
      description: "$2 Off Any Purchase"
    },
    {
      id: 2,
      image: "deals/fairpricedeals.png",
      title: "FairPrice",
      points: 650,
      description: "Free Reusable Bag (Min. Spend)"
    },
    {
      id: 3,
      image: "deals/vnmartdeals.png",
      title: "VN Super Mart",
      points: 700,
      description: "$3 Off Snacks & Drinks"
    },
    {
      id: 4,
      image: "deals/floristdeals.png",
      title: "DailyFlorist",
      points: 900,
      description: "$5 Off Any Bouquet"
    },
    {
      id: 5,
      image: "deals/tiantiandeals.png",
      title: "Tian Tian Flower",
      points: 950,
      description: "Free Flower Wrapper Upgrade"
    },
    {
      id: 6,
      image: "deals/clementifloristdeals.png",
      title: "Clementi Florist & Aquarium",
      points: 1000,
      description: "$8 Off Any Arrangement"
    },
    {
      id: 7,
      image: "deals/lfsdeals.png",
      title: "LFS Aquarium",
      points: 1100,
      description: "10% Off Aquarium Supplies"
    },
    {
      id: 8,
      image: "deals/Polyartdeals.png",
      title: "Polyart Aquarium",
      points: 1150,
      description: "$5 Off Fish Food"
    },
    {
      id: 9,
      image: "deals/sendittdeals.png",
      title: "Send Itt",
      points: 900,
      description: "$5 Off Bicycle Servicing"
    },
    {
      id: 10,
      image: "deals/hoyyongdeals.png",
      title: "Hoy Yong Seafood Restaurant",
      points: 1200,
      description: "$5 Off (Min. Spend $30)"
    },
    {
      id: 11,
      image: "deals/japanesedeals.png",
      title: "Yosakoi Japanese Food Alley",
      points: 850,
      description: "$3 Off Any Set Meal"
    },
    {
      id: 12,
      image: "deals/themeetingfriedrice.png",
      title: "Fried Rice @ The Meeting Place",
      points: 800,
      description: "Free Drink with Fried Rice"
    }
];



  const handleDealClick = (deal: Deal): void => {
    setSelectedDeal(deal);
  };

  const handleCloseDeal = (): void => {
    setSelectedDeal(null);
    setShowQRCode(false);
  };

  const handleRedeem = (): void => {
    setShowQRCode(true);
  };

  return (
    <>
      {/* Deal Modal Component */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={handleCloseDeal}>
          <div className="absolute bottom-0 left-0 right-0 flex flex-col py-5 bg-white rounded-t-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="h-0.5 w-20 bg-[#767676] rounded-4xl mb-6 mx-auto" />
            
            <div className="mx-auto w-[88%] h-[340px] flex flex-col">
              {!showQRCode ? (
                <>
                  <div className="flex flex-row gap-4 flex-1 items-center">
                    <img 
                      src={selectedDeal.image} 
                      className="w-[164px] h-[240px] object-cover rounded-[24px]"
                      alt={selectedDeal.title}
                    />
                    <div className="flex flex-col items-start justify-center">
                      <div className="font-inter font-bold text-3xl mb-4">{selectedDeal.description}</div>
                      <div className="flex flex-col items-start gap-2 font-semibold">
                        <div className="text-xl font-roboto">{selectedDeal.title}</div>
                        <div className="text-xl font-roboto flex flex-row items-center gap-2">
                          <img src="points.png" className="size-5" alt="Points" />
                          {selectedDeal.points}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleRedeem}
                    className="w-full bg-[#FF5B49] text-white font-semibold py-3 rounded-2xl mt-4 mb-1"
                  >
                    Redeem
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center flex-1">
                    <div className="bg-white p-3 rounded-2xl border-2 border-gray-200 mb-4">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=DEAL-REDEEMED-123456"
                        alt="QR Code"
                        className="w-[160px] h-[160px]"
                      />
                    </div>
                    <div className="text-center font-roboto text-gray-600">
                      <div className="font-semibold text-lg">{selectedDeal.description}</div>
                      <div className="text-sm mt-1">{selectedDeal.title}</div>
                    </div>
                  </div>
                  <button 
                    onClick={handleCloseDeal}
                    className="w-full bg-[#FF5B49] text-white font-semibold py-3 rounded-2xl mt-4 mb-1"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex flex-row justify-between items-center mx-auto w-[88%] mt-4">
          <div className="font-poppins font-semibold text-xl">Explore Deals</div>
          <div 
            className="font-poppins text-[14px] font-medium text-[#FF5B49] cursor-pointer hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All'}
          </div>
        </div>
        
        {showAll ? (
          <div className="mx-auto w-[88%] mt-4">
            <div className="grid grid-cols-2 gap-5">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="relative rounded-[24px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ width: '164px', height: '240px' }}
                  onClick={() => handleDealClick(deal)}
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
        ) : (
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mt-4">
            <div className="flex flex-row gap-3 pl-6">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="relative rounded-[24px] overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ width: '164px', height: '240px' }}
                  onClick={() => handleDealClick(deal)}
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
        )}
      </div>
    </>
  );
}
