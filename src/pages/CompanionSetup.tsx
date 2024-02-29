import React, { useState } from 'react';

const CompanionSetup: React.FC = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadOption, setUploadOption] = useState<'link' | 'upload'>('link');

  const colors = [
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Yellow', value: 'yellow' }, // Additional color
    { name: 'Purple', value: 'purple' }, // Additional color
    { name: 'Orange', value: 'orange' }, // Additional color
  ];

  const handleColorClick = (colorValue: string) => {
    setSelectedColor(colorValue === selectedColor ? null : colorValue);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedImage(event.target.files[0]);
    }
  };

  const handleUploadOptionChange = (option: 'link' | 'upload') => {
    setUploadOption(option);
    // Clear uploaded image when switching to link option
    if (option === 'link') {
      setUploadedImage(null);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Setup your Professional DEAF AI Companion</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xl font-medium mb-2">Name:</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="linkOption" className="block text-xl font-medium mb-2">Image Source:</label>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="linkOption"
                name="imageSource"
                value="link"
                checked={uploadOption === 'link'}
                onChange={() => handleUploadOptionChange('link')}
              />
              <label htmlFor="linkOption">Share Link</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="uploadOption"
                name="imageSource"
                value="upload"
                checked={uploadOption === 'upload'}
                onChange={() => handleUploadOptionChange('upload')}
              />
              <label htmlFor="uploadOption">Upload Image</label>
            </div>
          </div>
          {uploadOption === 'link' ? (
            <div>
              <label htmlFor="imageUrl" className="block text-xl font-medium mb-2">Image URL:</label>
              <input
                type="text"
                id="imageUrl"
                className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={imageUrl}
                onChange={event => setImageUrl(event.target.value)}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="imageUpload" className="block text-xl font-medium mb-2">Upload Image:</label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleImageChange}
              />
              {uploadedImage && (
                <div className="mt-2">
                  <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded image" className="w-full h-auto rounded-md" />
                </div>
              )}
            </div>
          )}
          <div className="flex justify-center">
            <div className="space-x-4 flex items-center">
              {colors.map(color => (
                <div
                  key={color.value}
                  className={`rounded-full w-12 h-12 cursor-pointer border-2 ${selectedColor === color.value ? 'border-black' : 'border-transparent'}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorClick(color.value)}
                />
              ))}
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanionSetup;
