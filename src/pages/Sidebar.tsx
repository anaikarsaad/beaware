// Sidebar.tsx
import React from 'react';

interface SidebarProps {
  activeItem: 'overview' | 'profile';
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  const isActive = (item: string) => activeItem === item ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-purple-600 hover:text-white';

  return (
    <aside className="w-64 bg-white shadow">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-purple-600">BeAware</h2>
        <nav className="mt-8">
          <a href="/overview" className={`block py-2.5 px-4 rounded ${isActive('overview')}`}>Overview</a>
          <a href="/profile" className={`block py-2.5 px-4 rounded mt-2 ${isActive('profile')}`}>Profile</a>
          <a href="/logout" className="block py-2.5 px-4 rounded mt-2 text-gray-700 hover:bg-purple-600 hover:text-white transition-colors duration-200">Logout</a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
