import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,  signInWithPopup,
  OAuthProvider,  } from 'firebase/auth';
import { app } from '../firebase'; // Ensure you have this Firebase configuration file
import LogoImage from '../images/Logo.png'; // Update with your actual path
import MainImage from '../images/Unnamed-file 1.svg'; // Update with your actual path
import GoogleLogo from '../images/google-logo.png'; // Add your Google logo SVG path
import AppleLogo from '../images/apple-logo.png'; 

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [userCreated, setUserCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userCreated) {
      navigate('/onboarding');
    }
  }, [userCreated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGoogleSignup = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log(result.user);
      navigate('/onboarding'); // Or your success route
    } catch (error) {
      console.error(error);
    }
  };

  const handleAppleSignup = async () => {
    const auth = getAuth(app);
    const provider = new OAuthProvider('apple.com');

    try {
      const result = await signInWithPopup(auth, provider);
      // Signed in 
      console.log(result.user);
      navigate('/onboarding'); // Or your success route
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('User created:', userCredential.user);
      setUserCreated(true);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Column */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center items-center lg:items-start px-6 lg:px-12 py-8 lg:py-12 lg:pt-24">
        <img src={LogoImage} alt="Logo" className="h-12 mb-6" />
        
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Sign-up to our application</h1>
        <p className="mb-8">Already have an account? 
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded-lg text-lg"
          >
            Let's go
          </button>

          <div className="text-xs text-gray-500 mt-3">
            By creating an account you are agreeing to the 
            <a href="/terms" className="underline text-gray-500"> Terms and Conditions</a> and 
            <a href="/privacy" className="underline text-gray-500"> Privacy Policy</a>.
          </div>
        </form>

        <div className="flex justify-between w-full max-w-md mt-8">
          <hr className="w-1/4 border-t-2 border-gray-200"/>
          <p className="text-center text-gray-400 uppercase px-3">or</p>
          <hr className="w-1/4 border-t-2 border-gray-200"/>
        </div>

        <div className="flex flex-col justify-between  w-full max-w-xs mt-8 items-center" style={{ width: '25rem', maxWidth: '100%' }}>
        <button onClick={handleGoogleSignup} className="w-full mb-4">
          <img src={GoogleLogo} alt="Sign up with Google" className="w-full" />
        </button>
        <button onClick={handleAppleSignup} className="w-full">
          <img src={AppleLogo} alt="Sign up with Apple" className="w-full" />
        </button>
      </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 bg-blue-900 flex justify-center items-center px-8 py-8 lg:px-12 lg:py-12 lg:pt-24">
        <div className="text-center">
          <h1 className="text-white text-2xl lg:text-3xl font-bold mb-4">TRANSFORMING SILENCE INTO EFFICIENCY</h1>
          <p className="text-white mb-6">Your Professional DEAF AI Companion</p>
          <img src={MainImage} alt="Main Illustration" className="w-3/4 lg:w-1/2 max-w-lg" style={{ maxWidth: '500px' }} />
        </div>
        </div>
    </div>
  );
};

export default SignUpPage;
