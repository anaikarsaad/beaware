
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Admin from './pages/Admin';
import OnboardingPage from './pages/Onboarding-page';
import SignUpPage from './pages/Sign-up-page';
import LoginPage from './pages/login-page'
import ForgotPassword from './pages/Forgot-Password';
import Dashboard from './pages/dashboard';
import CompanionSetup from './pages/CompanionSetup';
import ImageInfo from './pages/ImageInfo';
import AccountDetails from './pages/AccountDetails';
import Overview from './pages/Overview';
import StreamFetch from './pages/StreamFetch';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue ,update} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from './firebase'; 
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { BrowserRouter } from 'react-router-dom';
const exampleName = "Your Name";
const exampleImageUrl = "https://example.com/image.jpg";
const exampleQrCodeData = "Some QR Code Data";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />

        {/* Protected routes inside AuthenticatedRoute */}
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
            <Overview
    name={exampleName}
    imageUrl={exampleImageUrl}
    qrCodeData={exampleQrCodeData}
    
  />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthenticatedRoute>
              <AccountDetails/>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            
              <Admin />
            
          }
        />
        <Route
          path="/onboarding"
          element={
            <AuthenticatedRoute>
              <OnboardingPage/>
            </AuthenticatedRoute>
          }
        />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;