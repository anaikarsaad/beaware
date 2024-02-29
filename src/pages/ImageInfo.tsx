import React, { useState } from 'react';
import QRCode from 'qrcode.react';

// Assume SVGs for icons are imported or you're using an icon library
// import { ReactComponent as EditIcon } from './path-to-edit-icon.svg';
// import { ReactComponent as UserIcon } from './path-to-user-icon.svg';
// import { ReactComponent as Logo } from './path-to-logo.svg';
// import { ReactComponent as BackArrow } from './path-to-back-arrow.svg';

const ImageInfo: React.FC<{
  name: string;
  imageUrl: string;
  qrCodeData: string;
}> = ({ name, imageUrl, qrCodeData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCodeData)
      .then(() => setCopied(true))
      .catch((error) => console.error('Error copying to clipboard: ', error));

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header with logo and user icon */}
      <header className="flex items-center justify-between p-4 border-b">
        {/* Back navigation and logo */}
        <div className="flex items-center">
          {/* Replace with <BackArrow /> */}
          <span>{"<"}</span> 
          {/* Replace with <Logo /> */}
          <span>BeAware</span>
        </div>
        {/* User icon */}
        {/* Replace with <UserIcon /> */}
        <span>User name</span>
      </header>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="flex space-x-8">
          {/* Image column */}
          <div className="w-1/2">
            {/* Image container */}
            <div className="w-full h-64 overflow-hidden rounded-lg bg-white shadow-lg p-4">
              <img src={imageUrl} alt={name} className="object-cover rounded-lg" />
            </div>
            {/* Image info */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p>Sub information will be displayed here</p>
              {/* Edit button */}
              {/* Replace with <EditIcon /> inside the button */}
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                Edit image
              </button>
            </div>
          </div>

          {/* QR code column */}
          <div className="w-1/2 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold">QR Code of the image</h3>
            <p className="text-sm mb-4">Click the QR to copy link</p>
            <QRCode value={qrCodeData} size={128} />
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleCopy}
            >
              Copy
            </button>
            {copied && <p className="text-green-500 mt-2">Copied to clipboard!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;
