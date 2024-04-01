import React, { useState } from 'react';
import Button from '../components/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app} from '../firebase'; // Assuming 'app' is your Firebase app instance
import Header from '../components/Header';
import LogoImage from '../images/Logo.png';
import axios from 'axios';
import StreamAnimation from '../components/StreamLoading';
const OnboardingPage: React.FC = () => {
  const [color, setColor] = useState("");
  const auth = getAuth(app);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState(""); // State for user name
  const [imageLink, setImageLink] = useState(""); // State for image link
  const [showColor, setShowColor] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  // Handle change for the name input
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Handle change for the image link input
  const handleImageLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLink(e.target.value);
  };

  const handleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleFocus = () => {
    setShowColor(true);
  };
  const createStreamWithStyle = async (name:string) => {
    const apiUrl = 'http://localhost:3001/createStreamWithStyle';
    const data = {
      name: name,
      bannerColor: '#F77777',
      logoUrl: "https://example.com/logo.jpg"
    };
  
    const startTime = Date.now(); // Record the start time of the operation
  
    try {
      const response = await axios.post(apiUrl, data);
      console.log(response.data);
      console.log("success");
  
      const endTime = Date.now(); // Record the end time of the API call
      let timeTaken = endTime - startTime;
  
      // Ensure user sees loading state for at least 3 seconds in total
      if (timeTaken < 3000) {
        await new Promise((resolve) => setTimeout(resolve, 3000 - timeTaken));
      }
  
      // Navigate after ensuring total wait time of at least 3 seconds
      navigate('/overview', { state: { responseData: response.data } });
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 
    // Save user details to Firebase database
    if (user) {
      const db = getDatabase(app);
      // Use the set method instead of push to save data under the specific user ID
      const userRef = ref(db, `users/${user.uid}`); // This references the main ID directly
      
      const formData = {
        name: name,
        imageLink: imageLink,
        color: color,
      };
  
      try {
        // Use set instead of push
        await set(userRef, formData); // This will overwrite the data at this path with formData
        console.log('User details saved:', formData);
       createStreamWithStyle(name);
        // navigate('/');
      } catch (error: any) {
        console.error('Error saving user details:', error.message);
      }
    }
   
};

  return (
   

    <div>
    
          {isSubmitting ? (
        // Loading Animation
        <div className='flex flex-col justify-center items-center mt-[9%]'>
          <div className='w-[40%] height-[35%]'>
            <StreamAnimation />
          </div>
          <div className='flex flex-col'>
            <p className='text-2xl'>Your link is generating</p>
            <p className='text-[#4F4F4F] self-center'>This may take a few seconds</p>
          </div>
        </div>
      ) : (    
        <div className='flex items-center justify-center h-screen bg-[#F6F6F6] p-4'>
    <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 flex-row'>
      <div className='flex justify-center'>
      <img src={LogoImage} alt="Logo" className="h-12 self-center " />
      </div>
   
      {/* Form Content */}
      <div className='pt-5 flex flex-col gap-1 text-center'>
        <p className='font-bold text-2xl tracking-wide'>Let's set up some basic details</p>
        <div className='relative inline-block'>
        <div className='relative inline-block'> {/* This is the key change */}
            <p className='mb-3 inline-block'>Fill the form to know you better</p>
            {/* Tooltip trigger button */}
            <button
              className='inline-block ml-2 relative z-10' // Ensure this is above the tooltip
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <span className='text-gray-500 text-sm'>?</span>
            </button>
            {/* Tooltip content */}
            {showTooltip && (
              <div className='absolute bg-white text-sm text-left p-3 rounded-lg shadow-lg w-64'
                style={{ bottom: '60%', left: '180%', transform: 'translateX(-50%)', zIndex: 20 }}>
               <ul>
            <li><strong>Enter the name of the image:</strong> Provide a descriptive name for your stream.</li>
            <li><strong>Upload the image or paste URL:</strong> Provide the logo for your stream.</li>
            <li><strong>Enter the HEX code of the color:</strong> Choose a color that represents your stream.</li>
          </ul>
              </div>
            )}
          </div>
      </div>
        
      </div>
      <input
        placeholder='Stream Name'
        value={name}
        onChange={handleNameChange}
        className='w-full bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-2xl text-base outline-none text-gray-700 py-2 px-4 my-2'
      />
      <input
        placeholder='Stream Logo URL'
        value={imageLink}
        onChange={handleImageLinkChange}
        className='w-full bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-2xl text-base outline-none text-gray-700 py-2 px-4 my-2'
      />
        {/* Color Picker Input */}
        <div className='relative my-2'>
          <input
            placeholder='Stream Color'
            value={color} // Bind color state to input
            onChange={handleColor}
            onFocus={handleFocus}
            onBlur={() => setShowColor(false)}
            className='w-full bg-gray-100 border focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-2xl text-base outline-none py-2 px-4'
          />
          <div
            className='h-7 w-7 rounded-full absolute top-1/2 left-[85%] transform -translate-y-1/2'
            style={{ backgroundColor: color }}
          ></div>
        </div>

        {/* Submit Button */}
       <div className='text-center pt-4'>
          <Button buttonText='Submit' onClick={handleSubmit} />
        </div>
      </div>
      </div>)}
    </div>
    
  );
};

export default OnboardingPage;
