import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center w-full my-10">
                <form onSubmit={submitHandler} className="bg-white p-8 max-w-3xl w-full shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
                        🧑‍💻 Post a New Job 🧑‍💻
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="w-full my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="w-full my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="w-full my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <Label>Salary 💰</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="w-full my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <Label>Location 📍</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="w-full my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <Label>Job Type 📄</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="w-full my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <Label>Experience Level 🎓</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="w-full my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <Label>No of Positions 💼</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="w-full my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div>
                                    <Label>Company 🏢</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full my-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => (
                                                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                            {company.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? (
                            <Button className="w-full mt-6 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center">
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full mt-6 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg">
                                Post New Job 🚀
                            </Button>
                        )
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center mt-3'>*Please register a company first, before posting jobs.</p>
                    }
                </form>
            </div>
        </div>
    );
}

export default PostJob;
