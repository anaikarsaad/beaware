import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import LogoImage from '../images/Logo.png'; // Update with your actual path
import MainImage from '../images/Unnamed-file 1.svg'; // Update with your actual path
import MyLottieAnimation from '../components/LottieAnimation';
const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);
  const navigate = useNavigate();

  
  const handleForgotPassword = async () => {
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setIsResetEmailSent(true);
    } catch (error) {
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Column */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center items-center lg:items-start px-6 lg:px-12 py-8 lg:py-12 lg:pt-24 bg-gray-100">
        <img src={LogoImage} alt="Logo" className="h-16 mb-6" />

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Forgot Password
        </h1>

        <p className="text-gray-600 mb-4">
          Enter the email associated with your account.
        </p>

        {isResetEmailSent ? (
          <div className="text-gray-600 mb-4">
            An email has been sent to {email}. Please check your inbox to reset your password.
          </div>
        ) : (
          <form className="w-full max-w-md mt-2">
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-white bg-blue-500 border-0 py-3 px-10 focus:outline-none hover:bg-blue-600 rounded-lg text-lg"
            >
              Reset Password
            </button>
          </form>
        )}

        <div className="mt-4">
          <p className="text-gray-600">
            Remember your password?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Log in here
            </button>
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 bg-[#183053] flex justify-center items-center px-8 py-8 lg:px-12 lg:py-12 lg:pt-24">
        <div className="text-center">
          <h1 className="text-white text-2xl lg:text-3xl font-bold mb-4">TRANSFORMING SILENCE INTO EFFICIENCY</h1>
          <p className="text-white mb-6">Your Professional DEAF AI Companion</p>
          {/* <img src={image} alt="Main Illustration" className=" w-[1000px] h-[600px]" style={{ maxWidth: '500px' }} />    */}
          <MyLottieAnimation/>
              </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
