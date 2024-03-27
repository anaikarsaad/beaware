import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../firebase'; // Ensure you have this Firebase configuration file
import LogoImage from '../images/Logo.png'; // Update with your actual path

import image from '../images/sapien.png'
import GoogleLogo from '../images/google-logo.png'; // Add your Google logo SVG path
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import MyLottieAnimation from '../components/LottieAnimation';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [userCreated, setUserCreated] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userCreated) {
      navigate('/onboarding');
    }
  }, [userCreated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate email
    if (e.target.name === 'email') {
      setEmailError(validateEmail(e.target.value));
    }
    
    // Validate password
    if (e.target.name === 'password') {
      setPasswordError(validatePassword(e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Password validation logic
    if (validatePassword(formData.password) !== '') {
      console.error('Invalid password. Please ensure your password meets the requirements.');
      return;
    }
  
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

  // const handleGoogleSignup = async () => {
  //   const auth = getAuth(app);
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     console.log(result.user);
  //     navigate('/onboarding');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return '';
  };


  const validatePassword = (password: string) => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (
      password.length < minLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      return 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
  
    return ''; 
  };

  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Left Column */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start  items-center lg:items-start px-6 lg:px-12 py-8 lg:py-12 lg:pt-24">
        <img src={LogoImage} alt="Logo" className="h-12 mb-6" />
        
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Sign-up to our application</h1>
        <p className="mb-8">Already have an account?  <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className='flex-col justify-center '>

          
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-[105%] bg-gray-100 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              className="w-[105%] bg-gray-100 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-[105%] bg-gray-100 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>
          <div className='flex justify-center ml-3'>
          <button
            type="submit"
            className="text-white w-[100%] bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded-full text-lg"
          >
            Let's go
          </button>
          </div>
          </div>

          <div className="text-xs text-gray-500 mt-3">
            By creating an account you are agreeing to the 
            Terms and Conditions and 
             Privacy Policy.
          </div>
        </form>

        <div className="flex justify-between  max-w-md mt-8">
          <hr className="w-1/4 border-t-2 border-gray-200"/>

          <hr className="w-1/4 border-t-2 border-gray-200"/>
        </div>

        {/* <div className="flex flex-col justify-between   max-w-xs mt-8 items-center" style={{ width: '25rem', maxWidth: '100%' }}>
          <button onClick={handleGoogleSignup} className="w-full mb-4">
            <img src={GoogleLogo} alt="Sign up with Google" className="" />
          </button>
        </div> */}
      </div>

      {/* Right Column */}
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

export default SignUpPage;
