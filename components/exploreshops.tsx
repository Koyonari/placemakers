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
      name: "Ocean Delights",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #02-35",
      rating: 4.5,
      description: "Ocean Delights offers a curated selection of premium ornamental shrimp and aquarium supplies for enthusiasts.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 3,
      name: "Fresh Catch Market",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #01-88",
      rating: 4.8,
      description: "Fresh Catch Market specializes in exotic freshwater shrimp species and provides expert consultation services.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 4,
      name: "Seafood Paradise",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 3, #01-45",
      rating: 4.6,
      description: "Seafood Paradise brings you the finest selection of ornamental shrimp with a focus on rare and unique varieties.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 5,
      name: "Prawn Palace",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 4, #02-12",
      rating: 4.9,
      description: "Prawn Palace is dedicated to providing top-quality ornamental shrimp and comprehensive care support.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 6,
      name: "Marine Treasures",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #01-55",
      rating: 4.4,
      description: "Marine Treasures offers a diverse collection of ornamental shrimp species for aquarium enthusiasts.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 7,
      name: "Aqua Fresh",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 5, #03-20",
      rating: 4.7,
      description: "Aqua Fresh provides healthy, vibrant ornamental shrimp and expert advice for successful shrimp keeping.",
      reviews: [],
      photos: [],
      videos: []
    },
    {
      id: 8,
      name: "Golden Shell",
      image: "shops/shrimphub.jpg",
      location: "Clementi Ave 2, #01-99",
      rating: 4.5,
      description: "Golden Shell features premium ornamental shrimp and all the essential supplies for your aquarium.",
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
