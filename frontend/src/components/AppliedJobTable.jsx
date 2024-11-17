import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-8">
            <Table className="text-sm text-gray-800">
                <TableCaption className="text-xl font-semibold text-blue-600">
                    📝 A list of your applied jobs
                </TableCaption>
                <TableHeader className="bg-blue-100 text-blue-800">
                    <TableRow>
                        <TableHead className="p-4">📅 Date</TableHead>
                        <TableHead className="p-4">💼 Job Role</TableHead>
                        <TableHead className="p-4">🏢 Company</TableHead>
                        <TableHead className="p-4 text-right">⚙️ Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center text-lg text-gray-500">
                                😞 You haven't applied to any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-blue-50">
                                <TableCell className="p-4">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="p-4 text-blue-600">{appliedJob.job?.title}</TableCell>
                                <TableCell className="p-4 text-gray-700">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="p-4 text-right">
                                    <Badge
                                        className={`${
                                            appliedJob?.status === "rejected"
                                                ? 'bg-red-400 text-white'
                                                : appliedJob.status === 'pending'
                                                ? 'bg-yellow-400 text-white'
                                                : 'bg-green-400 text-white'
                                        } px-4 py-2 rounded-full text-sm font-semibold`}
                                    >
                                        {appliedJob.status === "rejected" ? "❌ Rejected" : appliedJob.status === 'pending' ? "⏳ Pending" : "✅ Accepted"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
