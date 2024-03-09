import React from 'react';

interface ButtonProps {
  buttonText: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Allow onClick to be optional
}

const Button: React.FC<ButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button
      onClick={onClick} // Use the onClick prop here
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
    >
      {buttonText}
    </button>
  );
};

export default Button;