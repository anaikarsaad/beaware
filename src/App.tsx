// src/App.tsx

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
import CompanionSetup from './pages/CompanionSetup';
import ImageInfo from './pages/ImageInfo';
import YourImages from './pages/YourImages';
const App: React.FC = () => {
const check:boolean = false;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
     <Route path='/' element={<Admin></Admin>}/>
      <Route path='/onboarding' element={<OnboardingPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/cs' element={<CompanionSetup/>}/>
      <Route path="/ii" element={<ImageInfo name="Sample Image" imageUrl="https://via.placeholder.com/300" qrCodeData="Sample QR Code Data" />} />
      <Route path='/your-images' element={<YourImages name="Sample Image" imageUrl="https://via.placeholder.com/300" />} />
        {/* ... (other routes) */}
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

export default App;
