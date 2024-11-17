import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-lg">
            <Table>
                <TableCaption className="text-xl font-semibold text-gray-800">👥 Applicants List</TableCaption>
                <TableHeader>
                    <TableRow className=" text-white">
                        <TableHead className="text-lg">👤 Full Name</TableHead>
                        <TableHead className="text-lg">📧 Email</TableHead>
                        <TableHead className="text-lg">📱 Contact</TableHead>
                        <TableHead className="text-lg">📄 Resume</TableHead>
                        <TableHead className="text-lg">📅 Date</TableHead>
                        <TableHead className="text-lg text-right">⚙️ Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="hover:bg-teal-50 transition-all duration-300">
                                <TableCell className="text-gray-800 font-semibold">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-indigo-700">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-gray-600">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item.applicant?.profile?.resume ? 
                                        <a 
                                            className="text-blue-600 hover:text-blue-800" 
                                            href={item?.applicant?.profile?.resume} 
                                            target="_blank" 
                                            rel="noopener noreferrer">
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className="text-gray-500">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-indigo-500 hover:text-indigo-700" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 p-2 bg-white shadow-lg rounded-lg">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div 
                                                        key={index} 
                                                        onClick={() => statusHandler(status, item?._id)} 
                                                        className='flex items-center gap-2 w-full cursor-pointer hover:bg-teal-100 rounded-lg p-2'>
                                                        <span className="text-sm text-gray-700">{status}</span>
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
