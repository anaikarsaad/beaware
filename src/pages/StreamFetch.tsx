import React,{useEffect,useState} from 'react';
import StreamAnimation from '../components/StreamLoading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue ,update} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase'; 
import { useLocation } from 'react-router-dom';
const StreamFetch: React.FC = ({}) => {
  const navigate = useNavigate();
  const [streamData, setStreamData] = useState({
    streamName: '',
    imageUrl:'',
    streamColor: '' 
  });
  
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  
  const location = useLocation();
  useEffect(()=>{
    
    const createStreamWithStyle = async () => {
      const apiUrl = 'http://localhost:3001/createStreamWithStyle';
      const data = {
        name: 'hello',
        bannerColor: '#F77777',
        logoUrl: "https://example.com/logo.jpg"
      };
    
      const startTime = Date.now(); // Record the start time of the operation
    
      try {
        const response = await axios.post(apiUrl, data);
        console.log(response.data);
        console.log("success");
    
        const endTime = Date.now(); // Record the end time of the API call
        let timeTaken = endTime - startTime;
    
        // Ensure user sees loading state for at least 3 seconds in total
        if (timeTaken < 3000) {
          await new Promise((resolve) => setTimeout(resolve, 3000 - timeTaken));
        }
    
        
        navigate('/overview', { state: { responseData: response.data } });
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
    
     createStreamWithStyle()
  },[])
  // useEffect(() => {
  //   // Log the values when streamData changes
    
  //   const DeleteStreamWithStyle = async () => {
  //     const apiUrl = '/stream/DeleteStream ';
  //     const data = {
  //       oldName: 'test1',
  //     }
    
  //     try {
  //       const response = await axios.post(apiUrl, data);
  //       console.log(response.data);
  //       console.log("success");
  //       // navigate('/overview', { state: { responseData: response.data } });
          
  //     } catch (error) {
  //       console.error('There was an error!', error);
  //     }
  //   };
  //   // console.log(streamData.streamName);
  //   // console.log(streamData.streamColor);
  //   // DeleteStreamWithStyle();
  //   // createStreamWithStyle()
  // }, [streamData]);
    

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

export default StreamFetch;
