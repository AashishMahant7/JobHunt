import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-[#F7F7F7] py-8'>
            <div className='flex flex-col gap-5 items-center'>
                {/* Tagline with Emoji */}
                <span className='px-6 py-3 rounded-full bg-[#F8D21D] text-[#1A202C] font-medium text-lg shadow-md'>
                    🌟 Your Gateway to Dream Jobs 🌟
                </span>
                {/* Main Heading */}
                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2A2A2A] text-center'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                {/* Subheading */}
                <p className='text-[#555555] text-base sm:text-lg md:text-xl lg:text-2xl mt-4 max-w-4xl mx-auto text-center'>
                    Find your perfect job among the top companies and take the next step in your career!
                </p>
                {/* Search Section */}
                <div className='flex w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 mt-8 shadow-lg border border-[#D1D5DB] rounded-full p-2 items-center gap-3 mx-auto bg-white'>
                    <input
                        type="text"
                        placeholder='Search your dream job...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full p-3 rounded-l-full text-lg placeholder-gray-400'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#5a2f98] text-white p-3">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
