import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

interface Review {
  id: number;
  date: string;
  rating: number;
  author: string;
  initials: string;
  content: string;
}

interface Photo {
  id: number;
  url: string;
  caption: string;
  author: string;
}

interface Video {
  id: number;
  thumbnail: string;
  title: string;
  duration: string;
  author: string;
}

interface Shop {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  description: string;
  reviews: Review[];
  photos: Photo[];
  videos: Video[];
}

export default function ExploreShops() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'review' | 'photo' | 'video'>('about');

  const [shops] = useState<Shop[]>([
    {
      id: 1,
      name: "ShrimpHub",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #01-197",
      rating: 4.7,
      description: "ShrimpHub is your premier destination for high-quality ornamental shrimps in Singapore. We specialize in a wide variety of freshwater shrimp species including Crystal Red Shrimp, Tiger Shrimp, Blue Bolt Shrimp, and rare Caridina and Neocaridina varieties. Our expert staff provides comprehensive guidance on shrimp care, tank setup, water parameters, and breeding techniques. Whether you're a beginner or an experienced aquarist, we offer healthy, vibrant shrimp sourced from reputable breeders, along with all the supplies you need for a thriving shrimp colony.",
      reviews: [
        {
          id: 1,
          date: "Dec 15, 2024",
          rating: 5,
          author: "Marcus T.",
          initials: "MT",
          content: "Absolutely love this place! Bought some Crystal Red Shrimp and they're all thriving in my tank. The staff really knows their stuff and gave me excellent advice on water parameters. Will definitely be back for more!"
        },
        {
          id: 2,
          date: "Dec 8, 2024",
          rating: 5,
          author: "Sarah L.",
          initials: "SL",
          content: "Best selection of ornamental shrimp I've seen in Singapore. Got some beautiful Blue Dream shrimp here last month and they're breeding like crazy now. The owner is super knowledgeable and patient with all my questions."
        },
        {
          id: 3,
          date: "Nov 28, 2024",
          rating: 4,
          author: "David K.",
          initials: "DK",
          content: "Great variety of Tiger shrimp and the quality is top-notch. Only minor issue was the wait time as they were quite busy, but definitely worth it. Staff helped me choose the perfect mix for my community tank."
        },
        {
          id: 4,
          date: "Nov 20, 2024",
          rating: 5,
          author: "Jennifer W.",
          initials: "JW",
          content: "First time buying ornamental shrimp and the team here made it so easy! They explained everything about caring for my new Bee shrimp colony. All 10 shrimp arrived healthy and are doing amazing. Highly recommend!"
        },
        {
          id: 5,
          date: "Nov 12, 2024",
          rating: 4,
          author: "Ryan C.",
          initials: "RC",
          content: "Solid shop with healthy stock. Picked up some Taiwan Bee shrimp and they've been doing great. Prices are fair for the quality you get. Would give 5 stars if they had more rare varieties in stock."
        },
        {
          id: 6,
          date: "Oct 30, 2024",
          rating: 5,
          author: "Amanda H.",
          initials: "AH",
          content: "ShrimpHub is my go-to place for all my shrimp needs. The Cherry shrimp I bought are super vibrant and healthy. They also have a good selection of shrimp food and supplies. Customer service is excellent!"
        }
      ],
      photos: [
        {
          id: 1,
          url: "shops/shrimphub.jpg",
          caption: "My new Crystal Red Shrimp colony is doing amazing!",
          author: "Marcus T."
        },
        {
          id: 2,
          url: "shops/shrimphub.jpg",
          caption: "Blue Bolt shrimp from here are so vibrant",
          author: "Sarah L."
        },
        {
          id: 3,
          url: "shops/shrimphub.jpg",
          caption: "Tiger shrimp breeding setup in my tank",
          author: "David K."
        },
        {
          id: 4,
          url: "shops/shrimphub.jpg",
          caption: "Look at these beautiful Bee shrimp!",
          author: "Jennifer W."
        },
        {
          id: 5,
          url: "shops/shrimphub.jpg",
          caption: "Taiwan Bee shrimp thriving after 2 weeks",
          author: "Ryan C."
        },
        {
          id: 6,
          url: "shops/shrimphub.jpg",
          caption: "Cherry shrimp babies everywhere!",
          author: "Amanda H."
        }
      ],
      videos: [
        {
          id: 1,
          thumbnail: "shops/shrimphub.jpg",
          title: "My Crystal Red Shrimp feeding time",
          duration: "0:45",
          author: "Marcus T."
        },
        {
          id: 2,
          thumbnail: "shops/shrimphub.jpg",
          title: "Blue Dream shrimp breeding behavior",
          duration: "1:23",
          author: "Sarah L."
        },
        {
          id: 3,
          thumbnail: "shops/shrimphub.jpg",
          title: "Tiger shrimp colony update - 3 months later",
          duration: "2:15",
          author: "David K."
        },
        {
          id: 4,
          thumbnail: "shops/shrimphub.jpg",
          title: "Unboxing my new Bee shrimp from ShrimpHub",
          duration: "1:50",
          author: "Jennifer W."
        }
      ]
    },
    {
      id: 2,
      name: "FairPrice (Clementi Ave 2)",
      image: "shops/fairprice.jpg",
      location: "352 Clementi Ave 2, #01-141/#01-143",
      rating: 4.4,
      description: "NTUC FairPrice supermarket for groceries and daily essentials.",
      reviews: [
        { id: 1, date: "Dec 22, 2025", rating: 4, author: "Jia Wei", initials: "JW", content: "Convenient neighbourhood supermarket. Good range of daily essentials and decent queue time." },
        { id: 2, date: "Jan 3, 2026", rating: 5, author: "Aisyah K.", initials: "AK", content: "Clean layout and easy to find items. Staff were helpful when I asked about promotions." },
        { id: 3, date: "Jan 6, 2026", rating: 4, author: "Nicholas T.", initials: "NT", content: "Prices are fair and there’s enough variety. Can get crowded during peak hours but manageable." },
      ],
      photos: [
        { id: 1, url: "shops/fairprice.jpg", caption: "Quick grocery run before dinner", author: "Jia Wei" },
        { id: 2, url: "shops/fairprice.jpg", caption: "Snacks and drinks aisle", author: "Aisyah K." },
      ],
      videos: [
        { id: 1, thumbnail: "shops/fairprice.jpg", title: "Grocery haul - Clementi", duration: "0:32", author: "Nicholas T." },
      ]
    },
    {
      id: 3,
      name: "Botanict",
      image: "shops/botanict.jpg",
      location: "Blk 352 Clementi Ave 2, #01-123",
      rating: 4.3,
      description: "A small local shop at Clementi Ave 2.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 4,
      name: "Hoy Yong Seafood Restaurant",
      image: "shops/hoyyong.jpg",
      location: "352 Clementi Ave 2, #01-153",
      rating: 4.5,
      description: "Local restaurant at Clementi Ave 2.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 5,
      name: "VN Super Mart",
      image: "shops/vnsupermart.jpg",
      location: "354 Clementi Ave 2, #01-177B",
      rating: 4.2,
      description: "Mini-mart for snacks, groceries, and daily needs.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 6,
      name: "Ikashah Halal Frozen Food",
      image: "shops/ikashah.jpg",
      location: "353 Clementi Ave 2, #01-11/#01-12",
      rating: 4.2,
      description: "Halal frozen food and fresh produce shop.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 7,
      name: "Evertop Clementi",
      image: "shops/evertop.jpg",
      location: "Blk 354 Clementi Ave 2, #01-259",
      rating: 4.3,
      description: "Local food outlet at Clementi Ave 2.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 8,
      name: "Sun Hee Hardware",
      image: "shops/sunhee-hardware.jpg",
      location: "354 Clementi Ave 2, #01-237/239",
      rating: 4.4,
      description: "Hardware store at Clementi Ave 2 for tools, home repair items, and supplies.",
      reviews: [],
      photos: [],
      videos: [],
    },
    {
      id: 9,
      name: "The Gift Box Confections",
      image: "shops/giftbox-confections.jpg",
      location: "Blk 354 Clementi Ave 2, #01-219",
      rating: 4.3,
      description: "Confectionery and dessert shop at Clementi Ave 2.",
      reviews: [],
      photos: [],
      videos: [],
    },
    {
      id: 10,
      name: "Sheng Siong Supermarket",
      image: "shops/shengsiong.jpg",
      location: "352 Clementi Ave 2, #01-91/93/95/97/99",
      rating: 4.5,
      description: "Supermarket for groceries and daily essentials at Clementi Ave 2.",
      reviews: [
        { id: 1, date: "Dec 18, 2025", rating: 5, author: "Hui Min", initials: "HM", content: "Good deals for groceries and household items. Always my go-to for weekly shopping." },
        { id: 2, date: "Jan 1, 2026", rating: 4, author: "Farhan R.", initials: "FR", content: "Lots of choices and usually stocked up. Slightly crowded on weekends." },
        { id: 3, date: "Jan 6, 2026", rating: 4, author: "Eileen L.", initials: "EL", content: "Convenient location and easy checkout. Fresh produce is generally good." },
      ],
      photos: [
        { id: 1, url: "shops/shengsiong.jpg", caption: "Weekend grocery shopping", author: "Hui Min" },
      ],
      videos: [
        { id: 1, thumbnail: "shops/shengsiong.jpg", title: "Quick walkthrough of aisles", duration: "0:41", author: "Farhan R." },
      ]
    },
    {
      id: 11,
      name: "DailyFlorist.sg",
      image: "shops/dailyflorist.jpg",
      location: "Block 353 Clementi Ave 2, #01-155A",
      rating: 4.2,
      description: "Florist offering bouquets and flower arrangements at Clementi Ave 2.",
      reviews: [
        { id: 1, date: "Dec 10, 2025", rating: 5, author: "Sharon G.", initials: "SG", content: "Bouquet was nicely arranged and wrapped. Good for gifting." },
        { id: 2, date: "Dec 28, 2025", rating: 4, author: "Mikhail T.", initials: "MT", content: "Friendly service and the flowers lasted a few days. Prices are reasonable." },
        { id: 3, date: "Jan 4, 2026", rating: 4, author: "Chloe N.", initials: "CN", content: "Good variety for small bouquets. Easy to pick something quickly." },
      ],
      photos: [
        { id: 1, url: "shops/dailyflorist.jpg", caption: "Picked up a small bouquet", author: "Sharon G." },
      ],
      videos: [
        { id: 1, thumbnail: "shops/dailyflorist.jpg", title: "Bouquet unwrapping", duration: "0:28", author: "Chloe N." },
      ]
    },
    {
      id: 12,
      name: "Brown Rice Paradise @ Clementi",
      image: "shops/brownriceparadise.jpg",
      location: "Blk 352 Clementi Ave 2, #01-105",
      rating: 4.4,
      description: "Healthy food option at Clementi Ave 2.",
      reviews: [],
      photos: [],
      videos: [],
    },
    {
      id: 13,
      name: "LFS Aquarium",
      image: "shops/lfs-aquarium.jpg",
      location: "328 Clementi Ave 2, #01-186",
      rating: 4.3,
      description: "Aquarium shop for fish supplies and accessories.",
      reviews: [
        { id: 1, date: "Nov 29, 2025", rating: 5, author: "Marcus Y.", initials: "MY", content: "Staff gave useful advice for beginners. Good selection of supplies." },
        { id: 2, date: "Dec 16, 2025", rating: 4, author: "Wei Sheng", initials: "WS", content: "Prices are okay and items are easy to find. Helpful recommendations for water conditioner." },
        { id: 3, date: "Jan 2, 2026", rating: 4, author: "Amanda L.", initials: "AL", content: "Convenient shop for aquarium essentials. I found the filter media I needed." },
      ],
      photos: [
        { id: 1, url: "shops/lfs-aquarium.jpg", caption: "Restocking aquarium supplies", author: "Marcus Y." },
      ],
      videos: [
        { id: 1, thumbnail: "shops/lfs-aquarium.jpg", title: "New tank setup items", duration: "0:36", author: "Amanda L." },
      ]
    },
    {
      id: 14,
      name: "Chan Electrical",
      image: "shops/chan-electrical.jpg",
      location: "353 Clementi Ave 2, #01-55",
      rating: 4.2,
      description: "Electrical services and supplies at Clementi Ave 2.",
      reviews: [],
      photos: [],
      videos: [],
    },
    {
      id: 15,
      name: "Tian Tian Flower Clementi",
      image: "shops/tiantian-flower.jpg",
      location: "352 Clementi Ave 2, #01-117",
      rating: 4.4,
      description: "Flower shop offering bouquets and floral arrangements at Clementi Ave 2.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 16,
      name: "Clementi Florist & Aquarium (C328)",
      image: "shops/clementi-florist-aquarium.jpg",
      location: "Blk 328 Clementi Ave 2, #01-210",
      rating: 4.3,
      description: "Florist and aquarium-related shop located at Clementi Ave 2 (C328).",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 17,
      name: "Buy Fish",
      image: "shops/buyfish.jpg",
      location: "354 Clementi Ave 2, #01-189",
      rating: 4.3,
      description: "Seafood retailer at Clementi Ave 2 selling fresh and frozen fish.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 18,
      name: "Polyart Aquarium",
      image: "shops/polyart-aquarium.jpg",
      location: "Block 328 Clementi Ave 2, #01-194",
      rating: 4.4,
      description: "Aquarium shop at Clementi Ave 2 for fish supplies and accessories.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 19,
      name: "Send Itt",
      image: "shops/senditt.jpg",
      location: "Block 354 Clementi Ave 2, #01-179",
      rating: 4.4,
      description: "Bicycle repair and servicing shop at Clementi Ave 2.",
      reviews: [
        { id: 1, date: "Dec 7, 2025", rating: 5, author: "Darren K.", initials: "DK", content: "Quick servicing and the bike felt smoother after. Friendly and straightforward." },
        { id: 2, date: "Dec 26, 2025", rating: 4, author: "Nadia S.", initials: "NS", content: "Helped adjust my brakes and checked the chain. Good neighbourhood repair shop." },
        { id: 3, date: "Jan 5, 2026", rating: 4, author: "Joel T.", initials: "JT", content: "Reasonable pricing and fast turnaround. I’ll come back for future tune-ups." },
      ],
      photos: [
        { id: 1, url: "shops/senditt.jpg", caption: "Dropped by for a quick tune-up", author: "Darren K." },
      ],
      videos: [
        { id: 1, thumbnail: "shops/senditt.jpg", title: "Before/after brake adjustment", duration: "0:30", author: "Nadia S." },
      ],
    },
    {
      id: 20,
      name: "Yosakoi Japanese Food Alley @ Clementi",
      image: "shops/yosakoi.jpg",
      location: "Block 352 Clementi Ave 2, #01-129",
      rating: 4.3,
      description: "Japanese food stall offering donburi and set meals at Clementi Ave 2.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 21,
      name: "Fried Rice @ The Meeting Place",
      image: "shops/friedrice.jpg",
      location: "353 Clementi Ave 2, #01-70",
      rating: 4.2,
      description: "Local fried rice stall located at The Meeting Place, Clementi Ave 2.",
      reviews: [],
      photos: [],
      videos: []
    },
  ]);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (selectedShop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedShop]);

  const displayedShops = showAll ? shops : shops.slice(0, 3);

  const handleShopClick = (shop: Shop): void => {
    setSelectedShop(shop);
  };

  const handleCloseShop = (): void => {
    setSelectedShop(null);
    setActiveTab('about');
  };

  return (
    <>
      {/* Shop Modal Component */}
      {selectedShop && (
        <div className="fixed inset-0 z-50">
          {/* Back button */}
          <button
            onClick={handleCloseShop}
            className="absolute left-5 top-12 bg-white rounded-full w-10 h-10 flex items-center justify-center z-[60] shadow-md"
          >
            <Icon
              icon="weui:back-filled"
              width="18"
              height="18"
              style={{ color: "black" }}
            />
          </button>

          <div className="w-full h-full flex flex-col">
            <div className="h-[calc(45%+40px)] w-full overflow-hidden">
              <img
                src={selectedShop.image}
                className="w-full h-full object-cover"
                alt={selectedShop.name}
              />
            </div>
            <div className="flex flex-col gap-3 h-3/5 w-full rounded-t-3xl pb-0 py-9 bg-white -mt-10 relative z-50">
              <div className="font-poppins font-bold text-2xl px-10">{selectedShop.name}</div>
              <div className="flex flex-col gap-2 font-poppins text-[#6F7789] px-10">
                <div className="flex flex-row gap-2 items-center">
                  <Icon
                    icon="mingcute:location-fill"
                    width="20"
                    height="20"
                    style={{ color: "#FF5B49" }}
                  />
                  <div className="text-md">{selectedShop.location}</div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Icon
                    icon="material-symbols:star-rounded"
                    width="20"
                    height="20"
                    style={{ color: "#FF5B49" }}
                  />
                  <div className="text-md font-semibold">{selectedShop.rating}</div>
                </div>
              </div>
              
              <div className="py-3.5 pb-1 font-poppins text-[16px] text-[#6F7789] flex flex-row">
                <div 
                  className={`cursor-pointer flex-1 text-center ${activeTab === 'about' ? 'text-black font-semibold' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </div>
                <div 
                  className={`cursor-pointer flex-1 text-center ${activeTab === 'review' ? 'text-black font-semibold' : ''}`}
                  onClick={() => setActiveTab('review')}
                >
                  Review
                </div>
                <div 
                  className={`cursor-pointer flex-1 text-center ${activeTab === 'photo' ? 'text-black font-semibold' : ''}`}
                  onClick={() => setActiveTab('photo')}
                >
                  Photo
                </div>
                <div 
                  className={`cursor-pointer flex-1 text-center ${activeTab === 'video' ? 'text-black font-semibold' : ''}`}
                  onClick={() => setActiveTab('video')}
                >
                  Video
                </div>
              </div>
              <div className="relative w-full h-[1px] bg-[#6F7789]/30">
                <div 
                  className="absolute h-[2px] bg-[#FF5B49] transition-all duration-300"
                  style={{
                    width: '20%',
                    left: activeTab === 'about' ? '2.5%' : activeTab === 'review' ? '27.5%' : activeTab === 'photo' ? '52.5%' : '77.5%'
                  }}
                ></div>
              </div>

              {/* Interchangeable div - About, Review, Photo, Video */}

              {/* About */}
              {activeTab === 'about' && (
                <div className="py-5 pb-1.5 px-10 flex flex-col gap-3 overflow-y-auto">
                  <div className="font-poppins font-bold text-[16px]">Description</div>
                  <div className="font-poppins font-light text-[13px]">
                    {selectedShop.description}
                  </div>
                </div>
              )}

              {/* Review */}
              {activeTab === 'review' && (
                <div className="py-5 px-10 flex flex-col gap-5 overflow-y-auto pb-1.5 font-poppins">
                  <div className="font-bold text-[16px]">Reviews ({selectedShop.reviews.length})</div>
                  {selectedShop.reviews.length > 0 ? (
                    selectedShop.reviews.map((review) => (
                      <div key={review.id} className="flex flex-col gap-1 font-poppins text-[12px] pb-3 border-b border-gray-200 last:border-b-0">
                        <div className="flex flex-col gap-0.5 text-[#6F7789]">{review.date}</div>
                        <div className="flex flex-row items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Icon
                              key={i}
                              icon="material-symbols:star-rounded"
                              width="20"
                              height="20"
                              style={{ color: "#FF5B49" }}
                            />
                          ))}
                        </div>
                        <div className="flex flex-row gap-2 items-center mb-2">
                          <div className="size-7 rounded-full bg-[#FF5B49] flex items-center justify-center text-white font-semibold text-[10px]">
                            {review.initials}
                          </div>
                          <div className="font-medium">{review.author}</div>
                        </div>
                        <div className="text-[#333] leading-relaxed">{review.content}</div>
                      </div>
                    ))
                  ) : (
                    <div className="font-light text-[13px] text-[#6F7789]">No reviews yet.</div>
                  )}
                </div>
              )}

              {/* Photo */}
              {activeTab === 'photo' && (
                <div className="py-5 px-10 flex flex-col gap-3 overflow-y-auto pb-1.5 font-poppins">
                  <div className="font-bold text-[16px]">Photos ({selectedShop.photos.length})</div>
                  {selectedShop.photos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {selectedShop.photos.map((photo) => (
                        <div key={photo.id} className="flex flex-col gap-1.5">
                          <img 
                            src={photo.url} 
                            alt={photo.caption}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <div className="text-[11px] text-[#333] px-1 leading-relaxed">{photo.caption}</div>
                          <div className="text-[10px] text-[#6F7789] px-1">- {photo.author}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="font-light text-[13px] text-[#6F7789]">No photos yet.</div>
                  )}
                </div>
              )}

              {/* Video */}
              {activeTab === 'video' && (
                <div className="py-5 px-10 flex flex-col gap-4 overflow-y-auto pb-1.5 font-poppins">
                  <div className="font-bold text-[16px]">Videos ({selectedShop.videos.length})</div>
                  {selectedShop.videos.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {selectedShop.videos.map((video, index) => (
                        <div key={video.id} className={`flex flex-col gap-2 pb-4 ${index !== selectedShop.videos.length - 1 ? 'border-b border-gray-200' : ''}`}>
                          <div className="flex flex-row gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <div className="relative">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-32 h-20 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/60 rounded-full w-10 h-10 flex items-center justify-center">
                                  <Icon
                                    icon="ph:play-fill"
                                    width="20"
                                    height="20"
                                    style={{ color: "white" }}
                                  />
                                </div>
                              </div>
                              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 justify-center flex-1">
                              <div className="text-[13px] font-medium text-black line-clamp-2">
                                {video.title}
                              </div>
                            </div>
                          </div>
                          <div className="text-[11px] text-[#6F7789] px-2">Posted by {video.author}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="font-light text-[13px] text-[#6F7789]">No videos yet.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-[88%] mt-8 flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center">
          <div className="font-poppins font-semibold text-xl">Explore Shops</div>
          <div
            className="font-poppins text-[14px] font-medium text-[#FF5B49] cursor-pointer hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </div>
        </div>
        {/* Shops list */}
        <div className="flex flex-col gap-4 mb-4">
          {displayedShops.map((shop) => (
            <div
              key={shop.id}
              className="flex flex-row gap-3 p-2 items-center bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleShopClick(shop)}
            >
              <img
                src={shop.image}
                alt={shop.name}
                className="size-[90px] object-cover rounded-lg"
              />
              <div className="flex flex-col gap-1 items-start font-poppins text-[#6F7789] justify-start">
                <div className="font-semibold text-lg text-black">
                  {shop.name}
                </div>
                <div className="text-xs flex flex-row gap-1.5 items-center">
                  <Icon
                    icon="mingcute:location-fill"
                    width="18"
                    height="18"
                    style={{ color: "#FF5B49" }}
                  />
                  <div>{shop.location}</div>
                </div>
                <div className="text-xs flex flex-row gap-1.5 items-center">
                  <Icon
                    icon="material-symbols:star-rounded"
                    width="18"
                    height="18"
                    style={{ color: "#FF5B49" }}
                  />
                  <div className="font-semibold">{shop.rating}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
