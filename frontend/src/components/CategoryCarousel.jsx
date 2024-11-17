import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';  // Assuming this is from ShadCN UI
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

// Categories with emojis added for better visual appeal
const category = [
    { label: "Frontend Developer", emoji: "👨‍💻" },
    { label: "Backend Developer", emoji: "💻" },
    { label: "Data Science", emoji: "📊" },
    { label: "Graphic Designer", emoji: "🎨" },
    { label: "FullStack Developer", emoji: "🌐" }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
  <div className='bg-[#F7F7F7] py-1'>
          <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8" >
            {/* Heading and description */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
                    Explore Jobs Tailored Just for You
                </h2>
                <p className="text-xl text-gray-700">
                    Discover job opportunities that match your skills and interests. Select a category to start your journey.
                </p>
            </div>

            {/* Carousel */}
            <Carousel className="w-full">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center items-center">
                                <Button 
                                    onClick={() => searchJobHandler(cat.label)} 
                                    variant="outline" 
                                    className="rounded-full px-6 py-3 text-xl flex items-center space-x-3 hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4"
                                >
                                    <span className="text-2xl">{cat.emoji}</span>
                                    <span>{cat.label}</span>
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-primary transition shadow-xl" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-primary transition shadow-xl" />
            </Carousel>
        </div>
  </div>
    );
};

export default CategoryCarousel;
