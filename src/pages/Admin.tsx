import React from 'react';
import StreamAnimation from '../components/StreamLoading';
import UpdatingAnimation from '../components/UpdatingAnimation';
const Admin: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-[10%]'>
        <div className='w-[30%] height-[25%]'>
        <UpdatingAnimation/>
        </div>
        </div>
  );

  
}

export default Admin;
