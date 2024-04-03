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
    <header className="bg-[#FFFFFF] text-white py-2 h-18 border-b-[1px] border-[#D1D1D1]">
      <div className="container ml-8 flex items-center justify-between">
        <img src={LogoImage} alt="Logo" className="h-10 mb-2" />
        {showDeleteButton  && (
          <>
          
            
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
