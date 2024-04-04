import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

interface InfoModalProps {
    onClose: () => void;
    show: boolean;
  }
  const InfoModal: React.FC<InfoModalProps> = ({ onClose, show }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg max-w-md w-full">
          <div className="mb-2">
            <h2 className="font-bold">Information</h2>
          </div>
          <ul>
            <li><strong>Enter the name of the image:</strong> Provide a descriptive name for your stream.</li>
            <li><strong>Upload the image or paste URL:</strong> Provide the logo for your stream.</li>
            <li><strong>Enter the HEX code of the color:</strong> Choose a color that represents your stream.</li>
          </ul>
          <div className="mt-4 flex justify-center">
            <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-700">Close</button>
            {/* <Button buttonText='Submit' onClick={onClose} /> */}
          </div>
        </div>
      </div>
    );
  };


  export default InfoModal;
    