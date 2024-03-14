import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import LogoIcon from '../images/Logo.png';
import userIcon from '../images/username.png';

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
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => console.error('Copy failed', error));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <button className="text-gray-600">
            <span className="material-icons">arrow_back</span>
          </button>
          <img src={LogoIcon} alt="BeAware Logo" className="h-10 ml-2" />
        </div>
        <div className="flex items-center">
          <span className="text-gray-800 text-sm mr-2">User name</span>
          <img src={userIcon} alt="User" className="h-8 w-8 rounded-full" />
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow rounded-lg flex flex-col justify-between">
            <img src={imageUrl} alt={name} className="rounded-lg w-full" />
            <div>
              <h2 className="text-2xl font-semibold mt-4">{name}</h2>
              <p className="text-gray-600">Sub information will be displayed here</p>
              <button className="text-blue-600 hover:text-blue-800 mt-4">
                Edit image
              </button>
            </div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center justify-between">
            <div>
              <QRCode value={qrCodeData} size={256} />
            </div>
            <div>
              <button
                onClick={handleCopy}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
              >
                Copy QR Code
              </button>
              {copied && <p className="text-green-500 mt-2">Copied to clipboard!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;