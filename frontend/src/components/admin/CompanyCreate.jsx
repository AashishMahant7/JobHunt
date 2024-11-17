import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error registering company, please try again.');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-purple-700">
                        🚀 Create Your Company
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Choose a name for your company. You can change it later.
                    </p>
                </div>

                <div className="mb-6">
                    <Label className="text-lg font-medium text-gray-700">Company Name</Label>
                    <Input
                        type="text"
                        className="my-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., JobHunt, Microsoft"
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="flex justify-between items-center gap-4 mt-10">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/admin/companies")}
                        className="w-full sm:w-auto px-6 py-3 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                        ❌ Cancel
                    </Button>
                    <Button
                        onClick={registerNewCompany}
                        className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        ✅ Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CompanyCreate;
