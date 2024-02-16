import React, { useState } from 'react';
import Button from '../components/Button';
import { Circle } from '@uiw/react-color';
const OnboardingPage: React.FC = () => {
  
  const[color,setColor]=useState("f6f6f6");
  const[showColor,setshowColor]=useState(false);
  const handleColor=(event:any)=>{
      
          setColor(event.target.value)
          console.log(color);
          
          
  }

  const handleFocus=()=>{
    setshowColor(true);
    
  }
  return (
    <div className='flex items-center justify-center h-screen bg-[#F6F6F6] '>
      <div className=' h-[600px] w-[556px] bg-[#FFFFFF] flex gap-5 items-center flex-col rounded-[20px] drop-shadow-2xl'>
      <div className='pt-10 flex flex-col gap-1'>
        <p className='font-bold text-2xl tracking-wide'>Lets setup some basic details</p>
        <p className='self-center'>Fill the form to know better</p>
      </div>
      <input placeholder='Name' className='border rounded-[20px] border-[#B0B0B0] w-[438px] h-[52px]  p-3'/>
      <input placeholder='Image Link' className='border rounded-[20px] border-[#B0B0B0] w-[438px] h-[52px] p-3'/>
      
        <div className='relative'>
        <input placeholder='Color'  className='border rounded-[20px] border-[#B0B0B0] w-[438px] h-[52px] p-3' onChange={handleColor} onFocus={handleFocus} onBlur={()=>{setshowColor(false)
      }}/>
              <div className='h-8 w-8 radius-10 rounded-full absolute top-1/2 left-[85%] transform -translate-y-1/2' style={{backgroundColor:color}}></div>      

        </div>
      

      
      <div className='pt-10 self-flexend'>
      <Button buttonText='Submit'></Button>
      
      </div>
      
      </div>
        </div>
  );
}

export default OnboardingPage;
