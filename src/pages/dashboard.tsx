import React, { useState } from 'react';
import QRCode from 'qrcode.react';

interface StreamDetailsProps {
  name: string;
  imageUrl: string;
  qrCodeData: string;
}

const Dashboard: React.FC<StreamDetailsProps> = ({ name, imageUrl, qrCodeData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCodeData)
      .then(() => setCopied(true))
      .catch((error) => console.error('Copying to clipboard failed: ', error));

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-5">
          <div className="mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">Basic Information</h1>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="flex flex-col items-center justify-center h-48 bg-gray-100 rounded-lg border border-gray-200">
                <button className="text-purple-500 hover:text-purple-700">
                  Add image
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="border p-4 rounded-lg h-48 relative">
                <h2 className="text-lg font-medium mb-2">Stream details</h2>
                <p className="text-gray-600 text-sm">Sub information will be displayed here.</p>
                <div className="absolute bottom-4 left-4">
                  <p className="text-gray-700">Name of the image</p>
                  <p className="text-gray-900">{name}</p>
                  <div className="flex mt-2 items-center">
                    <button className="text-purple-500 hover:text-purple-700 text-sm" onClick={handleCopy}>
                      {/* Replace with your copy icon */}
                      Copy link
                    </button>
                    {copied && <span className="text-green-500 text-sm ml-2">Copied!</span>}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <QRCode value={qrCodeData} size={64} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
