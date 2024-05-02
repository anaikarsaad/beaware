import React,{useState,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

interface SidebarProps {
  activeItem: 'overview' | 'profile';
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    console.log(`Current active route: ${location.pathname}`);
  }, [location]);

  const isActive = (item: string) => {
    // Assuming your paths are exactly "/overview" and "/profile"
    const currentPath = location.pathname === '/' ? 'overview' : location.pathname.substring(1);
    return currentPath === item ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white';
  };
   

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

  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Burger menu button for small screens */}
      <div className='relative mb-2 border-red-900'>
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden text-4xl text-blue-500 hover:text-blue-700 lg:p-4 absolute top-[0%] left-[1%]"
      >
        ☰
      </button>
      </div>
      

      {/* Sidebar for large screens and mobile menu for small screens */}
      <aside className={`bg-white shadow-lg z-30 fixed lg:static inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition duration-300 ease-in-out lg:flex lg:flex-col w-64 border-r-[1px] border-[#D1D1D1]`}>
        <div className="p-4 flex-1">
          <h2 className="text-xl font-semibold">General</h2>
          <nav className="mt-8">
          <Link to="/" className={`block py-2.5 px-4 rounded ${isActive('overview')}`}>
  Overview
</Link>
<Link to="/profile" className={`block py-2.5 px-4 rounded mt-2 ${isActive('profile')}`}>
  Profile
</Link>
          </nav>
        </div>
        
      </aside>
    </>
  );
};

export default Sidebar;
