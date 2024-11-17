import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg">
            <Table>
                <TableCaption className="text-xl font-semibold text-gray-800">🏢 Registered Companies</TableCaption>
                <TableHeader>
                    <TableRow className=" text-white">
                        <TableHead className="text-lg">Logo</TableHead>
                        <TableHead className="text-lg">Company Name</TableHead>
                        <TableHead className="text-lg">Date Registered</TableHead>
                        <TableHead className="text-lg text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id} className="hover:bg-teal-50 transition-all duration-300">
                            <TableCell>
                                <Avatar>
                                    <AvatarImage className="rounded-full w-12 h-12 object-cover" src={company.logo} alt={company.name} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="text-gray-800 font-semibold">{company.name}</TableCell>
                            <TableCell className="text-gray-500">{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-indigo-500 hover:text-indigo-700" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 p-2 bg-white shadow-lg rounded-lg">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center gap-2 w-full cursor-pointer hover:bg-teal-100 rounded-lg p-2"
                                        >
                                            <Edit2 className="w-4 text-indigo-500" />
                                            <span className="text-sm text-gray-700">Edit</span>
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

export default CompaniesTable;
