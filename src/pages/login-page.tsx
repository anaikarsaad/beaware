import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import LogoImage from '../images/Logo.png'; // Update with your actual path
import image from '../images/sapien.png'; // Update with your actual path
import GoogleLogo from '../images/google-logo.png'; // Add your Google logo SVG path
import { app } from '../firebase'; // Ensure you have this Firebase configuration file
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import MyLottieAnimation from '../components/LottieAnimation';
import { Link } from 'react-router-dom';
const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null); // State to hold error message

  const auth = getAuth();
  const [user, loading,] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError(null); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      console.log('Login successful');
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      setError('Invalid email or password. Please try again.'); // Set error message
    }
  };

  // const handleGoogleSignup = async () => {
  //   const auth = getAuth(app);
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     console.log(result.user);
  //     navigate('/overview');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
     <div className="w-full lg:w-1/2 flex flex-col justify-start  items-center lg:items-start px-6 lg:px-12 py-8 lg:py-12 lg:pt-24">
        <img src={LogoImage} alt="Logo" className="h-12 mb-6" />
        
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Login to our application</h1>
        <p className="mb-8">New User ?  <Link to="/Signup" className="text-blue-600 hover:underline">Signup</Link>
        </p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-[105%] bg-gray-100 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              className="w-[105%] bg-gray-100 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message if present */}

          <div className='flex-col justify-center ml-3'>
          <button
            type="submit"
            className="text-white w-[100%] bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded-full text-lg"
          >
            Login
          </button>
          <div className='flex justify-center ml-[-2]'>
          <p className="mt-5 self-center"> <Link to="/forgetPassword" className="text-blue-600 hover:underline">Forget Password?</Link></p>
          </div>
          
          </div>
          
        </form>

        {/* <div className="flex flex-col justify-between w-full max-w-xs mt-8 items-center" style={{ width: '25rem', maxWidth: '100%' }}>
          <button onClick={handleGoogleSignup} className="w-full mb-4">
            <img src={GoogleLogo} alt="Sign up with Google" className="w-full" />
          </button>
        </div> */}
      </div>

      <div className="w-full lg:w-1/2 bg-white flex justify-center items-center px-8 py-8 lg:px-12 lg:py-12 lg:pt-24">
        <div className="text-center">
          <h1 className="text-[#183053] text-2xl lg:text-3xl font-bold mb-4">TRANSFORMING SILENCE INTO EFFICIENCY</h1>
          <p className="text-[#183053] mb-6">Your Professional DEAF AI Companion</p>
          {/* <img src={image} alt="Main Illustration" className=" w-[1000px] h-[600px]" style={{ maxWidth: '500px' }} />    */}
          <MyLottieAnimation/>
              </div>
      </div>
    </div>
  );
};

export default LoginPage;
