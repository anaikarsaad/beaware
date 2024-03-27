import React from 'react';

interface ButtonProps {
  buttonText: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Allow onClick to be optional
}

const Button: React.FC<ButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button
      onClick={onClick} // Use the onClick prop here
      className="text-white w-[80%] bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded-full text-lg"
    >
      {buttonText}
    </button>
  );
};

export default Button;