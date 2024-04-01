import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase'; // Your Firebase initialization file
import Admin from '../pages/Admin';

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login'); // Redirect to signup if not loading and no user
    }
  }, [user, loading, navigate]);

  if (loading) return <Admin></Admin> // Or some loading animation/component

  return user ? <>{children}</> : null; // Render children if user exists, else render nothing
};

export default AuthenticatedRoute;
