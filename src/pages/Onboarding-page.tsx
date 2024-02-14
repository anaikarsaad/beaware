import React, { useState } from 'react';
import Button from '../components/Button';
import { ColorPicker } from 'primereact/colorpicker';
const OnboardingPage: React.FC = () => {
  const[color,setColor]=useState("6466f1");
  return (
    <div className='flex items-center justify-center h-screen bg-[#F6F6F6] '>
      <div className=' h-[552px] w-[556px] bg-[#FFFFFF] flex gap-3 items-center flex-col rounded-[20px] drop-shadow-2xl'>
      <div className='pt-10 flex flex-col gap-1'>
        <p className='font-bold text-2xl tracking-wide'>Lets setup some basic details</p>
        <p className='self-center'>Fill the form to know better</p>
      </div>
      <input placeholder='Name' className='border rounded-[20px] border-[#B0B0B0] w-[438px] h-[52px]  p-3'/>
      <input placeholder='Image Link' className='border rounded-[20px] border-[#B0B0B0] w-[438px] h-[52px] p-3'/>
      <input placeholder='Color'  className='border rounded-[20px] border-[#B0B0B0] w-[438px] h-[52px] p-3'  />
      <ColorPicker format="hex" value={color} onChange={(e) => setColor((e.value) as string)} className=''/>
      <div className='pt-10'>
      <Button buttonText='Submit'></Button>
      
      </div>
      
      </div>
        </div>
  );
}

export default OnboardingPage;
