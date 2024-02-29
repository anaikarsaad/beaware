import React, { useState } from 'react';
import QRCode from 'qrcode.react';

import LogoIcon from '../images/Logo.png';



// Make sure to replace these with actual imports for your SVGs or icon components
// import { ReactComponent as BackIcon } from './icons/BackIcon';
import userIcon from '../images/username.png';





// import { ReactComponent as LogoIcon } from './icons/LogoIcon';
// import { ReactComponent as EditIcon } from './icons/EditIcon';



const ImageInfo: React.FC<{
  name: string;
  imageUrl: string;
  qrCodeData: string;
}> = ({ name, imageUrl, qrCodeData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCodeData)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide the copied message after 2 seconds
      })
      .catch((error) => console.error('Copy failed', error));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
       
        
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center">
          {/* Replace with actual SVG icon */}
          <span className="text-gray-700 mr-2 cursor-pointer">{"<"}</span>
          <img src={LogoIcon} alt="Logo" className="h-8" /> {/* Logo icon */}
          <span className="font-bold text-xl">BeAware</span>
        </div>
        <span className="rounded-full bg-gray-200 p-2">
        <img src={userIcon} alt="User" className="h-8 rounded-full" /> {/* User icon */}
        </span>
      </header>

      {/* Content */}
      <div className="flex flex-grow items-center justify-center p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg flex max-w-4xl w-full mx-auto">
          <div className="flex-1">
            <div className="aspect-w-1 aspect-h-1">
              <img src={imageUrl} alt={name} className="rounded-lg object-cover" />
            </div>
            <h2 className="text-2xl font-bold my-4">{name}</h2>
            <p className="text-gray-600 mb-4">Sub information will be displayed here</p>
            <button className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
              {/* Replace with actual SVG icon */}
              Edit image
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="mb-4">
              <QRCode value={qrCodeData} size={128} />
            </div>
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-300"
            >
              Copy QR Code
            </button>
            {copied && <span className="text-green-500 mt-2">Copied!</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;
