import React, { useState } from 'react';
import QRCode from 'qrcode.react';

interface StreamDetailsProps {
  name: string;
  imageUrl: string;
  qrCodeData: string;
}

const Dashboard: React.FC<StreamDetailsProps> = ({ name, imageUrl, qrCodeData }) => {
  const [copied, setCopied] = useState(false);
  const [color, setColor] = useState('#000000'); // default color for the color picker

  const handleCopy = () => {
    navigator.clipboard.writeText(imageUrl)
      .then(() => setCopied(true))
      .catch((error) => console.error('Copying to clipboard failed: ', error));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* ...sidebar and other elements */}
      
      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">Basic Information</h1>
          <div className="flex flex-wrap -mx-2">
            {/* Image Upload Section */}
            <div className="w-full lg:w-1/3 px-2 mb-4">
              <div className="flex flex-col items-center justify-center h-48 bg-gray-100 rounded-lg border border-gray-200">
                <button className="text-purple-600 hover:text-purple-700">
                  Add image
                </button>
              </div>
            </div>
            {/* Stream Details Section */}
            <div className="w-full lg:w-1/3 px-2 mb-4">
              <div className="p-4 border rounded-lg h-auto relative bg-white">
                <h2 className="text-lg font-medium mb-2">Stream details</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image-name">
                    Name of the image
                  </label>
                  <input
                    id="image-name"
                    type="text"
                    value={name}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly // make this editable as per your requirement
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image-url">
                    Image URL
                  </label>
                  <input
                    id="image-url"
                    type="text"
                    value={imageUrl}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly // make this editable as per your requirement
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color-picker">
                    Pick a color
                  </label>
                  <input
                    id="color-picker"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-8"
                  />
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => { /* logic to handle editing */ }}
                >
                  Edit details
                </button>
              </div>
            </div>
            {/* QR Code Section */}
            <div className="w-full lg:w-1/3 px-2 mb-4">
              <div className="flex flex-col items-center p-4 border rounded-lg h-auto bg-white">
                <QRCode value={qrCodeData} size={128} fgColor={color} />
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleCopy}
                >
                  Copy link
                </button>
                {copied && <span className="text-green-500 text-sm">Copied to clipboard!</span>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
