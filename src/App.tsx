// src/App.tsx

import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './pages/Admin';
import OnboardingPage from './pages/Onboarding-page';
import SignUpPage from './pages/Sign-up-page';
const App: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/onboarding",
      element: <OnboardingPage />,
    },
    {
      path: "/admin",
      element: <Admin/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
    
  );
};

export default App;
