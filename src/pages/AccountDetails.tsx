import React, { useState } from 'react';
import LogoIcon from '../images/Logo.png';
import userIcon from '../images/username.png';
import { FaUser, FaEllipsisH, FaEdit, FaTrash } from 'react-icons/fa';

interface AccountDetailsProps {
  name: string;
  imageUrl: string;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ name, imageUrl }) => {
  // Mock data for user details
  const userDetails = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    // Add more user details as needed
  };

  // State to keep track of the active option
  const [activeOption, setActiveOption] = useState<string>('Profile');

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Header with thin border */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-300">
        <div className="flex items-center">
          <img src={LogoIcon} alt="BeAware Logo" className="h-10 ml-2" />
          <span className="text-xl font-semibold ml-2">BeAware</span>
        </div>
        <div className="flex items-center">
          <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700">
            <FaTrash className="mr-2" />
            Delete Account
          </button>
        </div>
      </header>
      {/* Main content area */}
      <div className="flex flex-grow">
        {/* Left Vertical Container with thin border */}
        <div className="w-48 bg-white flex-shrink-0 border-r border-gray-300 flex flex-col">
          <div className="pt-4 px-2 flex-grow">
            {/* Text "General" */}
            <p className="text-lg font-semibold mb-4">General</p>
            {/* List of options */}
            <ul className="flex flex-col">
              {/* Overview */}
              <li className={`mb-2 ${activeOption === 'Overview' ? 'bg-blue-200' : ''}`}>
                <a href="#" className={`text-gray-800 hover:text-blue-600 flex items-center`} onClick={() => setActiveOption('Overview')}>
                  <FaEllipsisH className="text-gray-500 mr-2" />
                  <span className="flex-grow">Overview</span>
                </a>
              </li>
              {/* Profile (highlighted as blue button) */}
              <li className="mb-2">
                <button className={`text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 w-full ${activeOption === 'Profile' ? 'bg-blue-600' : ''}`} onClick={() => setActiveOption('Profile')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white rounded-full h-6 w-6 flex items-center justify-center mr-2">
                        <FaUser className="text-blue-500" />
                      </div>
                      <span className="flex-grow">Profile</span>
                    </div>
                    <FaEdit className="ml-2" />
                  </div>
                </button>
              </li>
              {/* Add more options as needed */}
            </ul>
          </div>
          {/* Add any additional content that should be at the bottom of the left container */}
          <div className="pb-4"></div>
        </div>
        {/* Right Container */}
        <div className="flex-grow mt-4 ml-4">
          <div className="p-4 w-1/2 bg-white border-b border-gray-300">
            {/* Container for account details */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Account Details</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700">
                <FaEdit className="mr-2" />
                Edit
              </button>
            </div>
            <p className="mb-4">Your information will be displayed here.</p>
            {/* Fields */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
