import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import LogoImage from '../images/Logo.png'; // Update with your actual path
import MainImage from '../images/Unnamed-file 1.svg'; // Update with your actual path
import GoogleLogo from '../images/google-logo.png'; // Add your Google logo SVG path
import { app } from '../firebase'; // Ensure you have this Firebase configuration file
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null); // State to hold error message
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError(null); // Clear error when user changes input
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      console.log('Login successful');
      navigate('/onboarding');
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      setError('Invalid email or password. Please try again.'); // Set error message
    }
  };

  const handleGoogleSignup = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      navigate('/onboarding');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-12">
        <img src={LogoImage} alt="Logo" className="h-12 mb-6" />
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Login to your account</h1>
        <p className="mb-8">Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a></p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message if present */}

          <button
            type="submit"
            className="text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded-lg text-lg"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col justify-between w-full max-w-xs mt-8 items-center" style={{ width: '25rem', maxWidth: '100%' }}>
          <button onClick={handleGoogleSignup} className="w-full mb-4">
            <img src={GoogleLogo} alt="Sign up with Google" className="w-full" />
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-blue-900">
        <div className="flex items-center justify-center h-full p-8">
          <img src={MainImage} alt="Inspirational Visual" className="lg:max-w-lg lg:max-h-full" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">WELCOME BACK</h1>
          <p>Connect to your professional DEAF AI companion</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
