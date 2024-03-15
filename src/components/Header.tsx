import React, { useState } from 'react';
import LogoImage from '../images/LogoName.png';

interface HeaderProps {
  showDeleteButton?: boolean;
  onDeleteAccount?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showDeleteButton = false, onDeleteAccount }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDeleteAccount = () => {
    setShowConfirmationModal(true);
  };

  const confirmDelete = () => {
    onDeleteAccount?.(); // Trigger onDeleteAccount callback if provided
    setShowConfirmationModal(false); // Close the confirmation modal
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false); // Close the confirmation modal
  };

  return (
    <header className="bg-[#FFFFFF] text-white py-2 h-18">
      <div className="container ml-8 flex items-center justify-between">
        <img src={LogoImage} alt="Logo" className="h-10 mb-2" />
        {showDeleteButton  && (
          <>
            <button onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete Account
            </button>
            {showConfirmationModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                  <p className='text-black'>Are you sure you want to delete your account?</p>
                  <div className="mt-4 flex justify-end">
                    <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4">
                      Cancel
                    </button>
                    <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
