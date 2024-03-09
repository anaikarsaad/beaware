//import React, { useState } from 'react';
import LogoImage from '../images/Logo.png';
import MainImage from '../images/Unnamed-file 1.svg';
import MainPage from '../pages/Onboarding-page'
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database';
import { app, database } from '../firebase';
import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [userCreated, setUserCreated] = useState(false);  // New state

  const navigate = useNavigate();

  useEffect(() => {
    // Watch for changes in userCreated state
    if (userCreated) {
      navigate('/onboarding');  // Navigate to onboarding page
    }
  }, [userCreated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth(app);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // User successfully created
      const user = userCredential.user;
      console.log('User created:', user);

      // Set the userCreated state to trigger navigation
      setUserCreated(true);
    } catch (error: any) {
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column */}
      <div className="flex-1 p-8 text-red">
        <img className="mt-10" src={LogoImage} alt="Description of the image" />
        <h1 className="text-3xl font-bold mb-4">Sign Up for your application</h1>
        <p>Already have an Account <a href="MainPage">Login</a></p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded py-2 px-3"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded py-2 px-3"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Let's Go
          </button>
        </form>

        <p>By creating an account you are agreeing to <a href="MainPage">terms and condition</a>  and <a href="">privacy policy</a> </p>
                {/* Buttons */}
<div className="flex flex-col items-center mt-4">
  <button className="bg-white text-black font-semibold py-1 px-2 border border-black rounded hover:bg-gray-800 hover:border-gray-800" style={{ width: '320px' }}>
    Sign up with Google
  </button>
  <br />
  <button className="bg-white text-black font-semibold mt-2 py-1 px-2 border border-black rounded hover:bg-gray-800 hover:border-gray-800" style={{ width: '320px' }}>
    Sign up with Apple
  </button>
</div>
  
        
      </div>

      {/* Right Column */}
      <div className="flex-1 bg-blue-900 p-8 ">
        {/* Add content for the right column */}
        <h1 className='text-4xl font-bold text-white mt-10'>TRANSFORMING SILENCE INTO EFFICIENCY</h1>
        <p className='text-m text-white m-5 text-center' >Your professional DEAF AI companion</p>
        
        <img className='mx-auto my-auto' src={MainImage} alt="Description of the image" />
      </div>
    </div>
  );
}

export default SignUpPage;
