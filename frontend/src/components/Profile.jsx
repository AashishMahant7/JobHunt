import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// Replace with actual data
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
        <div className="flex justify-between items-center">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-blue-300 shadow-md">
              <AvatarImage
                src={user?.profile?.avatar || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-blue-600">
                {user?.fullname} 🎉
              </h1>
              <p className="text-gray-500">{user?.profile?.bio || "Add a bio"}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            onClick={() => setOpen(true)}
            className="text-right bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Pen className="mr-2" /> Edit Profile
          </Button>
        </div>

        {/* Contact Information */}
        <div className="my-5 text-gray-700">
          <h2 className="text-xl font-semibold mb-2">📞 Contact Information</h2>
          <div className="flex items-center gap-3 my-2">
            <span role="img" aria-label="email">
              📧
            </span>
            <span>{user?.email || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <span role="img" aria-label="phone">
              📱
            </span>
            <span>{user?.phoneNumber || "Not provided"}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5 text-gray-700">
          <h2 className="text-xl font-semibold mb-2">💼 Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                >
                  {skill} ✨
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 italic">No skills added</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-5">
          <Label className="text-lg font-bold">📄 Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline block mt-2"
            >
              {user?.profile?.resumeOriginalName || "Download Resume"}
            </a>
          ) : (
            <span className="text-gray-500 italic">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="font-bold text-2xl text-gray-700 mb-4">📝 Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
