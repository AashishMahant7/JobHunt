import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
      <div className="bg-[#F7F7F7] py-1">
          <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    <span className="inline-flex items-center space-x-2">
                        <span className="text-5xl animate-pulse">🚀</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                            Latest & Top Job Openings
                        </span>
                        <span className="text-5xl animate-pulse">🌟</span>
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    Find the most exciting and rewarding job opportunities just for you!
                </p>
            </div>

            {/* Job Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allJobs.length <= 0 ? (
                    <div className="col-span-full text-center text-gray-500 text-lg animate-pulse">
                        😞 <span>No jobs available at the moment. Check back later!</span>
                    </div>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <div key={job._id} className="transition-transform transform hover:scale-105 duration-300 shadow-xl flex flex-col p-5 rounded-lg  border border-black-700 min-h-[250px] ">
                            {/* Job Title */}
                            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
                            
                            {/* Job Description (Truncated) */}
                            <p className="text-sm mb-4">{job.description.split(' ').slice(0, 20).join(' ')}...</p>
                            
                            {/* Job Type, Location & Salary */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-yellow-500 font-semibold">{job.jobType} 🛠️</span>
                                <span className="text-green-500 font-semibold">{job.salary} LPA 💰</span>
                                <span className="text-indigo-400 font-semibold">{job.location} 📍</span>
                            </div>
                            
                            {/* View Details Button */}
                            <div className="flex justify-between items-center">
                                <button className="bg-indigo-600 hover:bg-indigo-500 py-2 px-4 rounded-md text-white transition duration-300">
                                    View Details 📄
                                </button>
                                <button className="bg-red-600 hover:bg-red-500 py-2 px-4 rounded-md text-white transition duration-300">
                                    Save for Later 🔖
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    );
};

export default LatestJobs;
