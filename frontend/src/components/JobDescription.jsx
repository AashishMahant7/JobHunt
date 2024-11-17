import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize the navigate function

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    // Handle button click to navigate back to jobs page
    const navigateToJobs = () => {
        navigate('/jobs'); // Redirect to the Jobs page
    }

    return (
        <div className="bg-gray-50 min-h-screen ">
            <Navbar />
            {/* Job Title & Meta */}
            <div className="flex items-center justify-between bg-white shadow-md p-6 rounded-lg mb-6">
                <div className="space-y-2">
                    <h1 className="font-extrabold text-3xl text-indigo-700 hover:text-indigo-900 transition-all duration-300">
                        {singleJob?.title} 💼
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                        <Badge className="text-blue-700 font-bold bg-blue-100" variant="ghost">🧑‍💼 {singleJob?.postion} Positions</Badge>
                        <Badge className="text-[#F83002] font-bold bg-[#F83002] bg-opacity-20" variant="ghost">🏷️ {singleJob?.jobType}</Badge>
                        <Badge className="text-[#7209b7] font-bold bg-[#7209b7] bg-opacity-20" variant="ghost">💰 {singleJob?.salary} LPA</Badge>
                    </div>
                </div>

                {/* Apply Button */}
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-6 py-3 transition-all ease-in-out duration-300 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white'} font-semibold text-lg`}
                >
                    {isApplied ? 'Already Applied ✅' : 'Apply Now 🚀'}
                </Button>
            </div>

            {/* Job Description */}
            <div className="space-y-6">
                <h1 className="text-2xl font-medium border-b-2 border-b-gray-300 pb-4">
                    📑 Job Description
                </h1>
                <div className="space-y-4">
                    <h1 className="font-semibold text-xl text-gray-700">
                        🔍 <span className="font-extrabold text-indigo-600">Role:</span> 
                        <span className="pl-4 font-normal text-gray-600">{singleJob?.title}</span>
                    </h1>
                    <h1 className="font-semibold text-xl text-gray-700">
                        📍 <span className="font-extrabold text-indigo-600">Location:</span> 
                        <span className="pl-4 font-normal text-gray-600">{singleJob?.location}</span>
                    </h1>
                    <h1 className="font-semibold text-xl text-gray-700">
                        📝 <span className="font-extrabold text-indigo-600">Description:</span> 
                        <span className="pl-4 font-normal text-gray-600">{singleJob?.description}</span>
                    </h1>
                    <h1 className="font-semibold text-xl text-gray-700">
                        🏆 <span className="font-extrabold text-indigo-600">Experience:</span> 
                        <span className="pl-4 font-normal text-gray-600">{singleJob?.experience} yrs</span>
                    </h1>
                    <h1 className="font-semibold text-xl text-gray-700">
                        💸 <span className="font-extrabold text-indigo-600">Salary:</span> 
                        <span className="pl-4 font-normal text-gray-600">{singleJob?.salary} LPA</span>
                    </h1>
                    <h1 className="font-semibold text-xl text-gray-700">
                        👥 <span className="font-extrabold text-indigo-600">Total Applicants:</span> 
                        <span className="pl-4 font-normal text-gray-600">{singleJob?.applications?.length}</span>
                    </h1>
                    <h1 className="font-semibold text-xl text-gray-700">
                        📅 <span className="font-extrabold text-indigo-600">Posted On:</span> 
                        <span className="pl-4 font-normal text-gray-600">{singleJob?.createdAt.split("T")[0]}</span>
                    </h1>
                </div>
            </div>

            {/* Return to Jobs Page Button */}
            <div className="mt-10 flex justify-center">
                <Button
                    onClick={navigateToJobs}
                    className="bg-indigo-600 text-white rounded-full py-3 px-8 text-xl font-semibold shadow-lg transform transition duration-300 hover:scale-105 hover:bg-indigo-700"
                >
                    🔙 Back to Jobs
                </Button>
            </div>
        </div>
    );
};

export default JobDescription;
