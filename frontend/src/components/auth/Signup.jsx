import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div >
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-96 border border-gray-300 rounded-lg bg-white shadow-lg p-6 space-y-6"
        >
          {/* Logo with Emoji */}
          <div className="flex justify-center mb-4">
            <span className="text-4xl text-yellow-400">🎓</span>
            <h1 className="font-bold text-4xl text-center text-gray-800 ml-2">Sign Up</h1>
          </div>

          {/* Full Name */}
          <div className="my-2">
            <Label className="text-sm text-gray-700">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Aashish Mahant"
              className="border-2 border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div className="my-2">
            <Label className="text-sm text-gray-700">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="aashish@gmail.com"
              className="border-2 border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Phone Number */}
          <div className="my-2">
            <Label className="text-sm text-gray-700">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="93153390XX"
              className="border-2 border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div className="my-2">
            <Label className="text-sm text-gray-700">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Aashish123"
              className="border-2 border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Role Selection with Emojis as Cards */}
          <div className="my-4">
            <Label className="text-sm text-gray-700">Choose your role</Label>
            <div className="flex justify-between my-4">
              <div
                onClick={() => setInput({ ...input, role: 'student' })}
                className={`w-1/2 p-4 text-center rounded-lg border-2 border-gray-300 cursor-pointer hover:shadow-lg transition-all ${
                  input.role === 'student' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <span className="text-4xl">🧑‍🎓</span>
                <h3 className="font-semibold">Student</h3>
                <p className="text-sm">Enroll to gain more chances for job</p>
              </div>
              <div
                onClick={() => setInput({ ...input, role: 'recruiter' })}
                className={`w-1/2 p-4 text-center rounded-lg border-2 border-gray-300 cursor-pointer hover:shadow-lg transition-all ${
                  input.role === 'recruiter' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <span className="text-4xl">💼</span>
                <h3 className="font-semibold">Recruiter</h3>
                <p className="text-sm">Post job openings and hire talent</p>
              </div>
            </div>
          </div>

          {/* Profile Picture Upload with Emoji */}
          <div className="flex items-center gap-2">
            <Label className="text-sm text-gray-700">Profile Picture 📸</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-2">
              Sign Up
            </Button>
          )}

          <span className="text-sm text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
