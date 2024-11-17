import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white shadow-md">
                <Navbar />
            </div>

            <div className="flex-grow max-w-8xl mx-auto mt-5 flex gap-4 overflow-hidden">
                {/* Filter Card */}
                <div className="w-1/4 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
                    <FilterCard />
                </div>

                {/* Jobs List */}
                <div className="w-3/4 h-[calc(100vh-80px)] overflow-y-auto">
                    {filterJobs.length <= 0 ? (
                        <span className="block text-center text-2xl md:text-3xl font-semibold text-black mt-12 p-56">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="flex items-center justify-between gap-4 flex-col sm:flex-row"
                            >
                                <span role="img" aria-label="Sad face" className="text-5xl">
                                    😔
                                </span>
                                <span className="text-lg sm:text-xl">
                                    Oops! It seems like we couldn't find any jobs matching your search 😞🔍.
                                    <br />
                                    But don't worry, keep exploring and you might find something soon! ✨
                                </span>
                                <span role="img" aria-label="Thumbs up" className="text-4xl">
                                    👍
                                </span>
                            </motion.span>
                        </span>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                            {filterJobs.map((job) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.4 }}
                                    key={job?._id}
                                    className="transition-all transform hover:scale-105 hover:shadow-xl p-2 bg-white rounded-lg shadow-md"
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
