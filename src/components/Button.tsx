import React from 'react'

interface ButtonProps{
    buttonText:string;
}

const Button:React.FC <ButtonProps> = ({buttonText}) => {
  return (
    <button className='w-[356px] h-[48px] bg-[#2071D5] rounded-full text-[#FFFFFF]'>{buttonText}</button>
  )
}

export default Button