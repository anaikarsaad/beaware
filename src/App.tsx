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
const App: React.FC = () => {
const check:boolean = false;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
     <Route path='/' element={<Admin></Admin>}/>
      <Route path='/onboarding' element={<OnboardingPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
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
