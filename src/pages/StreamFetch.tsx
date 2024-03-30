import React,{useEffect} from 'react';
import StreamAnimation from '../components/StreamLoading';
import axios from 'axios';
const StreamFetch: React.FC = () => {
  
  useEffect(() => {
    const createStreamWithStyle = async () => {
      const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://api.deafassistant.com/stream/CreateStreamWithStyle";

      try {
        const response = await axios.post(`${PROXY_URL}${API_URL}`, {
          name: "check",
          bannerColor: "#143770",
          logoUrl: "https://www.reporternews.com/gcdn/presto/2021/02/22/PARN/43eb2e64-40bb-43b3-82ff-42cbd5161f01-636197301348385455-Kiwanis-Club-logo.jpg"
        });

        // Handle response here
        console.log(response.data);
      } catch (error) {
        console.error('Error creating stream with style:', error);
      }
    };

    createStreamWithStyle();
  }, []);
    

  return (
        <div className='flex flex-col justify-center items-center mt-[9%]'>
        <div className='w-[40%] height-[35%]'>
        {/* <StreamAnimation/> */}
        </div>
        <div className='flex flex-col'>
          <p className='text-2xl'>Your link is generating</p>
          <p className='text-[#4F4F4F] self-center'>This may take few seconds</p>
        </div>
        
        </div>
  );
}

export default StreamFetch;
