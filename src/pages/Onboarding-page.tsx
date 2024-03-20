import React, { useState } from 'react';
import Button from '../components/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app} from '../firebase'; // Assuming 'app' is your Firebase app instance

const OnboardingPage: React.FC = () => {
  const [color, setColor] = useState("");
  const auth = getAuth(app);
  const [name, setName] = useState(""); // State for user name
  const [imageLink, setImageLink] = useState(""); // State for image link
  const [showColor, setShowColor] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        navigate('/overview');
      } catch (error: any) {
        console.error('Error saving user details:', error.message);
      }
    }
};

  return (
    <div className='flex items-center justify-center h-screen bg-[#F6F6F6] p-4'>
    <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-6'>
      {/* Form Content */}
      <div className='pt-10 flex flex-col gap-1 text-center'>
        <p className='font-bold text-2xl tracking-wide'>Let's set up some basic details</p>
        <p>Fill the form to know you better</p>
      </div>
      <input
        placeholder='Stream Name'
        value={name}
        onChange={handleNameChange}
        className='w-full bg-gray-100 border border-gray-300 rounded-2xl text-base outline-none text-gray-700 py-2 px-4 my-4'
      />
      <input
        placeholder='Stream Image Link'
        value={imageLink}
        onChange={handleImageLinkChange}
        className='w-full bg-gray-100 border border-gray-300 rounded-2xl text-base outline-none text-gray-700 py-2 px-4 my-4'
      />
        {/* Color Picker Input */}
        <div className='relative my-4'>
          <input
            placeholder='Color'
            value={color} // Bind color state to input
            onChange={handleColor}
            onFocus={handleFocus}
            onBlur={() => setShowColor(false)}
            className='w-full bg-gray-100 border border-gray-300 rounded-2xl text-base outline-none py-2 px-4'
          />
          <div
            className='h-8 w-8 rounded-full absolute top-1/2 left-[85%] transform -translate-y-1/2'
            style={{ backgroundColor: color }}
          ></div>
        </div>

        {/* Submit Button */}
       <div className='text-center pt-4'>
          <Button buttonText='Submit' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
