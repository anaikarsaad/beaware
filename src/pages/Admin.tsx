import React from 'react';
import StreamAnimation from '../components/StreamLoading';
const Admin: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-[9%]'>
        
        <div className='w-[40%] height-[35%]'>
        <StreamAnimation/>
        </div>
        <div className='flex flex-col'>
          <p className='text-2xl'>Your link is generating</p>
          <p className='text-[#4F4F4F] self-center'>This may take few seconds</p>
        </div>
        
        </div>
  );
}

export default Admin;
