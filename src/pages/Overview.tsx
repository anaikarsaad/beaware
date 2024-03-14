import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Sidebar from './Sidebar'; // Adjust the import path as necessary

interface OverviewProps {
    name: string;
    imageUrl: string;
    qrCodeData: string;
  }
  
  const Overview: React.FC<OverviewProps> = ({ name: initialName, imageUrl, qrCodeData }) => {
    const [name, setName] = useState(initialName); // Use initialName to set the initial state
    const [color, setColor] = useState('#000000');
    const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCodeData)
      .then(() => setCopied(true))
      .catch((error) => console.error('Copying to clipboard failed: ', error));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar activeItem="overview" />
      <main className="flex-1">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Basic Information</h1>
          <div className="flex gap-6">
            <div className="w-1/3">
              <div className="bg-white p-6 shadow rounded">
                <button className="text-purple-500 hover:bg-purple-100 font-bold py-2 px-4 rounded">
                  Add image
                </button>
              </div>
            </div>
            <div className="w-1/3">
              <div className="bg-white p-6 shadow rounded">
                <h2 className="text-lg font-medium mb-4">Stream details</h2>
                <p className="text-sm text-gray-500 mb-2">Sub information will be displayed here.</p>
                <div className="mb-4">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded" 
                    placeholder="Name of the image" 
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="color"
                      value={color} 
                      onChange={(e) => setColor(e.target.value)}
                      className="w-6 h-6 p-0 border-none rounded"
                    />
                    <span>{color}</span>
                  </div>
                </div>
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => {/* handle edit details */}}
                >
                  Edit details
                </button>
              </div>
            </div>
            <div className="w-1/3">
              <div className="bg-white p-6 shadow rounded flex flex-col items-center">
                <QRCode value={qrCodeData} size={128} fgColor={color} />
                <button
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCopy}
                >
                  Copy link
                </button>
                {copied && <span className="text-green-500 text-sm mt-2">Copied to clipboard!</span>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Overview;