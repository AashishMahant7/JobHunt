import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Function to calculate the number of days ago the job was posted
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60)); // Convert to days
  };

  // Limit job description to 50 words
  const shortDescription = job?.description?.split(' ').slice(0, 20).join(' ') + (job?.description?.split(' ').length > 20 ? '...' : '');

  return (
    <div className="flex flex-col p-5 rounded-lg shadow-lg bg-white border border-gray-200 min-h-[350px]"> {/* Min height to ensure equal card heights */}
      {/* Job Date and Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? '📅 Today' : `📅 ${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-4">
        <Button className="p-2" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-xl text-indigo-600">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">🌍 India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="my-2 flex-grow">
        <h1 className="font-bold text-lg text-blue-800">{job?.title}</h1>
        <p className="text-sm text-gray-600">{shortDescription}</p>
      </div>

      {/* Job Type, Position, Salary */}
      <div className="flex items-center gap-3 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType} 🛠️
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary}LPA 💰
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-indigo-600 border-indigo-600 hover:bg-indigo-100"
        >
          View Details 📄
        </Button>
        <Button className="bg-[#7209b7] text-white hover:bg-[#540792]">Save for Later 🔖</Button>
      </div>
    </div>
  );
};

export default Job;
