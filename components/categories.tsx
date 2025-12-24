import { useState } from "react";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(1);
  
  const categories = [
    { id: 1, name: "Health", image: "/categories/health.png" },
    { id: 2, name: "F&B", image: "/categories/f&b.png" },
    { id: 3, name: "Groceries", image: "/categories/groceries.png" },
    { id: 4, name: "Speciality", image: "/categories/speciality.png" },
    { id: 5, name: "Services", image: "/categories/services.png" },
    { id: 6, name: "Fashion", image: "/categories/fashion.png" },
    { id: 7, name: "Furnishing", image: "/categories/furnishing.png" },
    { id: 8, name: "Eyecare", image: "/categories/eyecare.png" },
  ];
  
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="text-[20px] font-poppins font-semibold mx-auto w-[88%]">
        Categories
      </div>
      {/* Category carousel */}
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex pb-2 pl-[calc((100%-88%)/2)]">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="flex flex-col items-center gap-3 cursor-pointer flex-shrink-0 w-20"
            >
              <div 
                className={`w-12.5 h-12.5 rounded-full bg-[#FFCDCA] flex items-center justify-center transition-all duration-300 ease-in-out ${
                  activeCategory === category.id ? "border-2 border-[#FF5B49]" : "border-2 border-transparent"
                }`}
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span className="text-center font-poppins font-semibold text-xs">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
