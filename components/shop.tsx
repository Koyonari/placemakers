import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  location: string;
  rating: number;
  description: string;
}

interface CartItem extends Item {
  quantity: number;
}

export default function Shop() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  
  const [items] = useState<Item[]>([
    {
      id: 1,
      name: "Smart Kettle",
      price: 28,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #01-83",
      rating: 4.7,
      description: "Experience the perfect brew every time with this smart electric kettle. Features precise temperature control, auto shut-off for safety, and a sleek matte finish that complements any kitchen. The 1.7L capacity is perfect for family use, while the rapid boil technology saves you time. Includes keep-warm function and BPA-free construction for peace of mind."
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 45,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #05-123",
      rating: 4.5,
      description: "Immerse yourself in crystal-clear sound with this portable Bluetooth speaker. Featuring 360-degree audio output, deep bass, and up to 12 hours of playtime on a single charge. Water-resistant design makes it perfect for outdoor adventures. Connect wirelessly to any device and enjoy your favorite music anywhere you go."
    },
    {
      id: 3,
      name: "Desk Lamp",
      price: 35,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #03-45",
      rating: 4.8,
      description: "Modern LED desk lamp with adjustable brightness levels and color temperatures to suit any task. Features a flexible gooseneck design for precise positioning, touch controls, and a USB charging port. Energy-efficient LED technology lasts up to 50,000 hours. Perfect for studying, working, or reading with reduced eye strain."
    },
    {
      id: 4,
      name: "Coffee Maker",
      price: 68,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #01-89",
      rating: 4.6,
      description: "Brew barista-quality coffee at home with this programmable coffee maker. Features a built-in grinder, multiple brew strength settings, and a thermal carafe that keeps coffee hot for hours. The 24-hour programmable timer lets you wake up to fresh coffee. Easy to clean with removable parts and auto-clean function."
    },
    {
      id: 5,
      name: "Wireless Charger",
      price: 32,
      image: "items/kettle.jpg",
      location: "Clementi Ave 3, #02-45",
      rating: 4.7,
      description: "Fast wireless charging pad compatible with all Qi-enabled devices. Features intelligent charging technology that automatically adjusts power output for optimal charging speed. Slim, lightweight design with non-slip surface and LED indicator. Includes overheating and overcharging protection for safe, reliable charging."
    },
    {
      id: 6,
      name: "Air Purifier",
      price: 85,
      image: "items/kettle.jpg",
      location: "Clementi Ave 2, #04-67",
      rating: 4.9,
      description: "Breathe cleaner air with this HEPA air purifier that removes 99.97% of airborne particles including dust, pollen, and pet dander. Features three-stage filtration, quiet operation, and covers rooms up to 300 sq ft. Smart sensor automatically adjusts fan speed based on air quality. Perfect for allergies and better sleep."
    }
  ]);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (selectedItem || showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem, showCart]);

  const handleItemClick = (item: Item): void => {
    setSelectedItem(item);
  };

  const handleCloseItem = (): void => {
    setSelectedItem(null);
  };

  const handleAddToCart = (): void => {
    if (selectedItem) {
      const existingItem = cart.find(item => item.id === selectedItem.id);
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === selectedItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { ...selectedItem, quantity: 1 }]);
      }
      setSelectedItem(null);
    }
  };

  const handleRemoveFromCart = (id: number): void => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      {/* Header */}
      <div className="w-[88%] mx-auto flex flex-row justify-between mt-10">
        <div className="font-semibold text-[24px] text-[#131313] font-poppins">Online Shop</div>
        <button 
          className="relative"
          onClick={() => setShowCart(true)}
        >
          <div className="bg-[#FF5B49] rounded-full p-3 size-12 flex items-center justify-center">
            <Icon
              icon="fluent-mdl2:shopping-cart"
              style={{
                color: "#FFFFFF",
                height: "32px",
                width: "32px",
              }}
            />
          </div>
          {getTotalItems() > 0 && (
            <div className="absolute -bottom-[4.5px] -right-[4.5px] bg-[#535353] rounded-full w-5 h-5 flex items-center justify-center align-center text-white text-xs font-poppins font-semibold">
              {getTotalItems()}
            </div>
          )}
        </button>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-[#F5F5F5]">
          {/* Back button */}
          <button
            onClick={() => setShowCart(false)}
            className="absolute left-5 top-12 bg-white rounded-full w-10 h-10 flex items-center justify-center z-[60] shadow-md"
          >
            <Icon
              icon="weui:back-filled"
              width="18"
              height="18"
              style={{ color: "black" }}
            />
          </button>

          <div className="w-full h-full flex flex-col pt-32 px-6">
            <div className="font-poppins font-bold text-[24px] mb-6">Your Cart</div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto mb-32">
              {cart.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-row gap-3 bg-white p-3 rounded-xl items-center">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 flex flex-col justify-between font-poppins">
                        <div>
                          <div className="font-semibold text-[16px]">{item.name}</div>
                          <div className="font-bold text-[24px]">${item.price}</div>
                        </div>
                        <div className="text-[13px] text-[#6F7789]">Quantity: {item.quantity}</div>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <Icon
                          icon="mdi:trash-can"
                          width="24"
                          height="24"
                          style={{ color: "#FF5B49" }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-[#6F7789] font-poppins">
                  <Icon
                    icon="mdi:cart-outline"
                    width="80"
                    height="80"
                    style={{ color: "#D0D0D0" }}
                  />
                  <div className="mt-4 text-[16px]">Your cart is empty</div>
                </div>
              )}
            </div>

            {/* Total and Checkout */}
            {cart.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 px-6 py-6 bg-white border-t border-gray-200">
                <div className="flex flex-row justify-between items-center font-poppins mb-4">
                  <div className="font-bold text-[20px]">Total</div>
                  <div className="font-bold text-[24px]">${getTotalPrice()}</div>
                </div>
                <button className="w-full bg-[#FF5B49] text-white font-poppins font-semibold text-[16px] py-4 rounded-2xl hover:bg-[#FF4535] transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-white">
          {/* Back button */}
          <button
            onClick={handleCloseItem}
            className="absolute left-5 top-12 bg-white rounded-full w-10 h-10 flex items-center justify-center z-[60] shadow-md"
          >
            <Icon
              icon="weui:back-filled"
              width="18"
              height="18"
              style={{ color: "black" }}
            />
          </button>

          <div className="w-full h-full flex flex-col overflow-y-auto">
            {/* Image Section */}
            <div className="w-full h-[280px] overflow-hidden flex-shrink-0">
              <img
                src={selectedItem.image}
                className="w-full h-full object-cover"
                alt={selectedItem.name}
              />
            </div>

            {/* Content Section with rounded top corners */}
            <div className="flex-1 bg-white px-8 pt-6 pb-24 rounded-t-3xl -mt-6 relative z-10">
              {/* Title and Price */}
              <div className="font-poppins font-bold text-2xl mb-3">
                {selectedItem.name}
              </div>
              <div className="font-poppins font-bold text-3xl text-black mb-4">
                ${selectedItem.price}
              </div>

              {/* Location and Rating */}
              <div className="flex flex-col gap-2 font-poppins text-[#6F7789] mb-6">
                <div className="flex flex-row gap-2 items-center">
                  <Icon
                    icon="mingcute:location-fill"
                    width="20"
                    height="20"
                    style={{ color: "#FF5B49" }}
                  />
                  <div className="text-md">{selectedItem.location}</div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Icon
                    icon="material-symbols:star-rounded"
                    width="20"
                    height="20"
                    style={{ color: "#FF5B49" }}
                  />
                  <div className="text-md font-semibold">{selectedItem.rating}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <div className="font-poppins font-bold text-[16px] mb-2">Description</div>
                <div className="font-poppins text-[13px] text-[#6F7789] leading-relaxed">
                  {selectedItem.description}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="fixed bottom-0 left-0 right-0 px-8 py-5 bg-white border-t border-gray-100 z-20">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#FF5B49] text-white font-poppins font-semibold text-[16px] py-4 rounded-2xl hover:bg-[#FF4535] transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-3 w-[88%] mx-auto mt-6 mb-2">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col items-center p-3 bg-white rounded-xl cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleItemClick(item)}
          >
            <img src={item.image} alt={item.name} className="object-cover aspect-square rounded-lg" />
            <div className="font-poppins items-start mt-2 w-full">
              <div className="text-[12px] items-center">{item.name}</div>
              <div className="text-[14px] font-semibold items-center">${item.price}</div>
              <div className="text-[12px] text-[#535865] text-ellipsis overflow-x-hidden line-clamp-1 flex flex-row items-center gap-1 mb-1 mt-0.5">
                <Icon
                  icon="mingcute:location-fill"
                  width="18"
                  height="18"
                  style={{ color: "#FF5B49" }}
                />
                <div className="text-ellipsis overflow-x-hidden line-clamp-1">{item.location}</div>
              </div>
              <div className="text-[12px] text-[#535865] flex flex-row items-center gap-1">
                <Icon
                  icon="material-symbols:star-rounded"
                  width="18"
                  height="18"
                  style={{ color: "#FF5B49" }}
                />
                <div className="font-medium">{item.rating}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
