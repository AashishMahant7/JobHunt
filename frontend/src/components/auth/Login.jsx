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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Animation */}
      <div ></div>

      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white rounded-lg shadow-xl p-6"
        >
          <h1 className="font-bold text-2xl mb-6 text-center text-purple-600">
            🔑 Login to Your Account
          </h1>

          {/* Email Input */}
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="you@example.com"
              className="w-full border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="block mb-2 font-medium text-gray-700">
              Choose Your Role
            </Label>
            <div className="flex gap-4 justify-center">
              <div
                onClick={() => setInput({ ...input, role: 'student' })}
                className={`cursor-pointer p-4 rounded-lg shadow-md flex items-center justify-center text-center ${
                  input.role === 'student'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } hover:scale-105 transform transition-all`}
              >
                <span role="img" aria-label="student" className="text-2xl mr-2">
                  🎓
                </span>
                Student
              </div>
              <div
                onClick={() => setInput({ ...input, role: 'recruiter' })}
                className={`cursor-pointer p-4 rounded-lg shadow-md flex items-center justify-center text-center ${
                  input.role === 'recruiter'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } hover:scale-105 transform transition-all`}
              >
                <span role="img" aria-label="recruiter" className="text-2xl mr-2">
                  💼
                </span>
                Recruiter
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div className="flex flex-col gap-4">
            {loading ? (
              <Button
                className="w-full bg-purple-500 text-white py-2 rounded-lg flex items-center justify-center"
                disabled
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Logging In...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-all"
              >
                Login
              </Button>
            )}

            <span className="text-sm text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-600 hover:underline">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
