import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

interface SidebarProps {
  activeItem: 'overview' | 'profile';
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  const navigate = useNavigate();

  const isActive = (item: string) =>
    activeItem === item ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white';

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      console.log('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <aside className="w-64 bg-white shadow flex flex-col">
      <div className="p-4 ">
        <h2 className="text-xl font-semibold">General</h2>
        <nav className="mt-8 flex-col">
          <Link to="/overview" className={`block py-2.5 px-4 rounded ${isActive('overview')}`}>
            Overview
          </Link>
          <Link to="/profile" className={`block py-2.5 px-4 rounded mt-2 ${isActive('profile')}`}>
            Profile
          </Link>
        </nav>
      </div>
      <button
        onClick={handleLogout} // Call handleLogout function on button click
        className="block py-2.5 px-4 rounded mt-2 text-blue-500 hover:bg-red-600 hover:text-white transition-colors duration-200 justify-end mt-[180%]"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
