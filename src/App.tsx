
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

const exampleName = "Your Name";
const exampleImageUrl = "https://example.com/image.jpg";
const exampleQrCodeData = "Some QR Code Data";




const App: React.FC = () => {
const check:boolean = false;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
     <Route path='/' element={<Admin></Admin>}/>
      <Route path='/onboarding' element={<OnboardingPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
       <Route path='/profile' element={<AccountDetails/>}></Route> 
      {/* <Route path='/cs' element={<CompanionSetup/>}/> */}
      {/* <Route path="/ii" element={<ImageInfo name="Sample Image" imageUrl="https://via.placeholder.com/300" qrCodeData="Sample QR Code Data" />} /> */}

       <Route path='/overview' element={
  <Overview
    name={exampleName}
    imageUrl={exampleImageUrl}
    qrCodeData={exampleQrCodeData}
  />
} /> 

      <Route path='/dashboard' element={
          <Dashboard/>}/>

    

      <Route path="/forgot-password" element={<ForgotPassword />} />

    <Route  
    path='/admin'  
    element={<Admin/>}
     loader={async () => {
      const user = await check
      if (!check) {
        throw redirect("/signup");
      }

      return "hello"
    }}
    
    />
    </Route>
    
    )
  );
 
  return (
    
    <RouterProvider router={router} />
    
  );
};

export default App