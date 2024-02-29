// src/pages/YourImages.tsx

import React from 'react';
import LogoIcon from '../images/Logo.png';
import userIcon from '../images/username.png';

interface YourImagesProps {
  name: string;
  imageUrl: string;
}

const YourImages: React.FC<YourImagesProps> = ({ name, imageUrl }) => {
  // Mock data for uploaded images
  const uploadedImages = [
    { name: 'Image 1', number: 1 },
    { name: 'Image 2', number: 2 },
    { name: 'Image 3', number: 3 },
    //{ name: 'Image 4', number: 4 },
    //{ name: 'Image 5', number: 5 },
    //{ name: 'Image 6', number: 6 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <img src={LogoIcon} alt="BeAware Logo" className="h-10 ml-2" />
          <span className="text-xl font-semibold ml-2">BeAware</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-800 text-sm mr-2">User name</span>
          <img src={userIcon} alt="User" className="h-8 w-8 rounded-full" />
        </div>
      </header>
      <div className="flex-grow p-4 overflow-y-auto">
        {/* Container for All Body Contents */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Uploaded Images</h2>
              <p className="text-gray-600">Subheading on the left top corner</p>
            </div>
            <a href="#" className="text-blue-600 hover:underline">
              Upload Image
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              >
                {/* Container for Image and Text */}
                <div className="border-2 border-gray-300 p-4 rounded-lg">
                  {/* Image with Increased Height */}
                  <img
                    src={imageUrl}
                    alt={name}
                    className="h-32 w-full object-cover rounded-lg mb-2"
                  />
                  {/* Text Content */}
                  <div className="text-left mt-2">
                    <h2 className="text-lg font-semibold">{image.name}</h2>
                    <p className="text-gray-600">#0000{image.number}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourImages;
