import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to manage mobile menu

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600 text-white shadow-lg transition-all duration-500 ease-in-out">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-6 sm:px-8 h-16">
        {/* Logo */}
        <div>
        <h1 className="text-3xl sm:text-4xl font-bold font-poppins hover:text-yellow-400 cursor-pointer transition-colors duration-300">
  Job<span className="text-yellow-300">Hunt</span>
</h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6 transition-transform duration-300" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-lg font-medium">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:underline hover:text-yellow-300 transition-all">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:underline hover:text-yellow-300 transition-all">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:underline hover:text-yellow-300 transition-all">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:underline hover:text-yellow-300 transition-all">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:underline hover:text-yellow-300 transition-all">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border border-white text-black py-2 px-4 rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-lg transition-all"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="text-white py-2 px-4 rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-lg transition-all">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:scale-110 transform transition-all">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || 'Profile'} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-white text-gray-800 shadow-lg rounded-md w-64">
                <div className="p-4">
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || 'Profile'} />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500">{user?.profile?.bio || 'No bio available'}</p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="flex flex-col gap-2">
                    {user && user.role === 'student' && (
                      <div className="flex items-center gap-2 text-indigo-600 cursor-pointer hover:text-indigo-800">
                        <User2 />
                        <Button variant="link" asChild>
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-red-500 cursor-pointer hover:text-red-700">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link" className="text-red-500">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-gray-800 py-4 px-6 shadow-lg">
          <ul className="space-y-4 text-lg font-medium">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:underline hover:text-indigo-600 transition-all">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:underline hover:text-indigo-600 transition-all">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:underline hover:text-indigo-600 transition-all">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:underline hover:text-indigo-600 transition-all">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:underline hover:text-indigo-600 transition-all">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {/* Auth Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            {!user ? (
              <>
                <Link to="/login">
                  <Button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-yellow-400 text-indigo-800 py-2 px-4 rounded-lg hover:bg-yellow-500 transition-all">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                onClick={logoutHandler}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
