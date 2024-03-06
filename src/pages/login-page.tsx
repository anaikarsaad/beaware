// Import necessary hooks and Firebase functions
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import LogoImage from '../images/Logo.png';
import MainImage from '../images/Unnamed-file 1.svg';

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      console.log('Login successful');
      navigate('/'); 
    } catch (error: any) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column */}
      <div className="flex-1 p-8">
        <img className="mt-10" src={LogoImage} alt="Company Logo" />
        <h1 className="text-3xl font-bold mb-4">Login to your account</h1>
        <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</a></p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              value={loginData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right Column */}
      <div className="flex-1 bg-blue-900 p-8 text-white">
        <h1 className='text-4xl font-bold mt-10'>WELCOME BACK</h1>
        <p className='text-m m-5 text-center'>Connect to your professional DEAF AI companion</p>
        <img className='mx-auto my-auto' src={MainImage} alt="Inspirational Visual" />
      </div>
    </div>
  );
};

export default LoginPage;
