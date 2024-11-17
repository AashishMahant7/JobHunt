import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="p-8 rounded-xl shadow-lg bg-[#F7F7F7]">
            <Table className='bg-white'>
                <TableCaption className="text-xl font-semibold text-gray-800">📋 List of Recently Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow className=" text-black">
                        <TableHead className="text-lg">🏢 Company</TableHead>
                        <TableHead className="text-lg">🎯 Role</TableHead>
                        <TableHead className="text-lg">📅 Date</TableHead>
                        <TableHead className="text-lg text-right">⚙️ Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id} className="hover:bg-teal-50 transition-all duration-300">
                            <TableCell className="text-gray-800 font-semibold">{job?.company?.name}</TableCell>
                            <TableCell className="text-indigo-700 font-semibold">{job?.title}</TableCell>
                            <TableCell className="text-gray-500">{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-indigo-500 hover:text-indigo-700" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 p-2 bg-white shadow-lg rounded-lg">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${job._id}`)}
                                            className="flex items-center gap-2 w-full cursor-pointer text-teal-600 hover:bg-teal-100 px-2 py-1 rounded-lg">
                                            <Edit2 className="w-5 text-teal-600" />
                                            <span className="text-sm font-medium">Edit</span>
                                        </div>
                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 w-full cursor-pointer mt-2 text-indigo-500 hover:bg-indigo-100 px-2 py-1 rounded-lg">
                                            <Eye className="w-5 text-indigo-500" />
                                            <span className="text-sm font-medium">View Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
