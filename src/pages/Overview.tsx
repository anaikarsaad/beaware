import React, { useState,useEffect } from 'react';
import QRCode from 'qrcode.react'; // Import QRCode component
import Sidebar from './Sidebar'; 
import Header from '../components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue ,update} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import UpdatingAnimation from '../components/UpdatingAnimation';
import SuccessAnimation from '../components/SuccessAnimation';
interface OverviewProps {
  name: string;
  imageUrl: string;
  qrCodeData: string;
}

const Overview: React.FC<OverviewProps> = ({ name: initialName, imageUrl: initialImageUrl, qrCodeData }) => {
  
  const [streamData, setStreamData] = useState({
    streamName: initialName,
    imageUrl:initialImageUrl,
    streamColor: '' 
  });
  const [fetchedStreamData, setFetchedStreamData] = useState({
    streamName: '',
    imageUrl: '',
    streamColor: '',
  });

  const [hasChanges, setHasChanges] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
      
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setStreamData({
            streamName: data.name,
            imageUrl: data.imageLink,
            streamColor: data.color,
          });
          setFetchedStreamData({
            streamName: data.name,
            imageUrl: data.imageLink,
            streamColor: data.color,
          });
          console.log(data.name);
          console.log(data.color);
        }
        else {
          // Data is null, handle this case appropriately
          console.error('No data available for this user.');
        }
      },(error) => {
        console.error('Firebase read failed: ', error);
      });
    }
  }, [user]);
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    navigate('/login');
  }

  const handleEditDetails = () => {
    setIsEditing(true);
  };

  const handleSaveDetails = async () => {
    const hasChanges = 
    streamData.streamName !== fetchedStreamData.streamName || 
    streamData.imageUrl !== fetchedStreamData.imageUrl || 
    streamData.streamColor !== fetchedStreamData.streamColor;

  if (!hasChanges) {
    console.log('No changes detected. Update not required.');
    setIsEditing(false); // Exit editing mode without making an update
    return; // Exit the function early
  }
    setIsSaving(true);
   await  DeleteStream(fetchedStreamData.streamName);
    await createStreamWithStyle(streamData.streamName,streamData.imageUrl,streamData.streamColor);
    setIsEditing(false);
    setIsSaving(false);
    setShowSuccess(true);
    const startTime=Date.now();
    const endTime = Date.now(); // Record the end time of the API call
    let timeTaken = endTime - startTime;

    // Ensure user sees loading state for at least 3 seconds in total
    if (timeTaken < 1500) {
      await new Promise((resolve) => setTimeout(resolve, 1500 - timeTaken));
    }
    setShowSuccess(false);
    resetAfterSave(); 
    // Update Firebase database with new details if user is defined
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      update(userRef, {
        name: streamData.streamName,
        imageLink: streamData.imageUrl,
        color: streamData.streamColor
      })
      .then(() => {
        setFetchedStreamData({
          streamName: streamData.streamName,
          imageUrl: streamData.imageUrl,
          streamColor: streamData.streamColor,
        });
        

        console.log('Details saved successfully.');
      })
      .catch((error) => {
        console.error('Error saving details: ', error);
      });
    } else {
      console.error('User is not defined.');
    }
  };
  
  

  const handleCancelEdit = () => {
    setIsEditing(false);
    setStreamData({
      streamName:fetchedStreamData.streamName,
      imageUrl: fetchedStreamData.imageUrl,
      streamColor: fetchedStreamData.streamColor
    });
  };
  const createStreamWithStyle = async (name:string,img:string,color:string) => {
    const apiUrl = 'http://localhost:3001/createStreamWithStyle';
    const data = {
      name: name,
      bannerColor: color,
      logoUrl: img
    };
  
     
  
    try {
      const response = await axios.post(apiUrl, data);
      console.log(response);
      console.log("success");
  
      
  
      // Navigate after ensuring total wait time of at least 3 seconds
      
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  const DeleteStream = async (name:string) => {
    const apiUrl = 'http://localhost:3001/DeleteStream';
    const data = {
      oldName: name,
     
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
  
      // Navigate after ensuring total wait time of at least 3 seconds
      
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStreamData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    // Check against the fetchedStreamData to see if there are any changes
    const currentData = { ...streamData, [name]: value };
    const changesDetected = 
      currentData.streamName !== fetchedStreamData.streamName ||
      currentData.imageUrl !== fetchedStreamData.imageUrl ||
      currentData.streamColor !== fetchedStreamData.streamColor;
  
    setHasChanges(changesDetected);
  };

  const resetAfterSave = () => {
    setHasChanges(false);
    setFetchedStreamData({
      streamName: streamData.streamName,
      imageUrl: streamData.imageUrl,
      streamColor: streamData.streamColor,
    });
  };

  const handleCopy = () => {
    // Construct the URL you want to copy
    const urlToCopy = `http://deafassistant.com/${encodeURIComponent(streamData.streamName)}`;
  
    // Use the navigator.clipboard.writeText function to copy the URL
    navigator.clipboard.writeText(urlToCopy)
      .then(() => setCopied(true))
      .catch(err => console.error('Copying to clipboard failed: ', err));
  
    // Reset the 'copied' state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Header />
      {isSaving && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
    <div className='flex flex-col justify-center items-center h-[40%] w-[40%]'>
      <UpdatingAnimation/>
      
      
    </div>
  </div>
)}
{showSuccess && (
       <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
       <div className='flex flex-col justify-center items-center h-[40%] w-[40%]'>
        <SuccessAnimation />
        </div>
      </div>
    )}

      <div className="flex flex-1 overflow-auto bg-gray-50 ">
      <Sidebar  activeItem="overview"/>
      <main className="flex flex-col lg:flex-row flex-1">
        <div className="flex-1 p-8 pb-0">
          <div className="bg-white shadow-lg rounded-lg p-6 h-auto lg:h-[480px] mx-auto mb-6 lg:mb-0" style={{ maxWidth: '672px' }}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <h1 className="text-xl lg:text-3xl font-semibold text-gray-800">Stream Details</h1>
                {!isEditing && (
                   <><button
                   onClick={() => window.open('https://uwin365-my.sharepoint.com/:b:/g/personal/gopan_uwindsor_ca/EVdikoDaqhdHtpqMMXRrR3MB0uNMrrJYCjL3fsB00exjuw?e=i54VPt', '_blank')}
                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 lg:mt-0 lg:mr-4"
                 >
                   Download Manual
                 </button><button onClick={handleEditDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 lg:mt-0">
                      Edit
                    </button></>
                )}
              </div>
              <div className='mb-6'>
                <p>Your information will be displayed here</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 mb-2">Stream Name</label>
                  <input
                    type="text"
                    value={streamData.streamName}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    name="streamName"
                    className="w-full bg-gray-100 border focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-2xl text-base outline-none py-2 px-4 mt-3"
                    
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={streamData.imageUrl}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    name="imageUrl"
                    className="w-full bg-gray-100 border focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-2xl text-base outline-none py-2 px-4 mt-3"
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2">Stream Color</label>
                  {/* <input
                    type="color"
                    value={streamData.streamColor}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    name="streamColor"
                    className="w-full bg-gray-100 border focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-2xl text-base outline-none py-2 px-4"
                  /> */}
                  <div className='relative mt-3'>
          <input
            placeholder='Stream Color'
            value={streamData.streamColor} // Bind color state to input
            onChange={handleInputChange}
            readOnly={!isEditing}
            // onFocus={handleFocus}
            // onBlur={() => setShowColor(false)}
            name="streamColor"
            className='w-full bg-gray-100 border focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-2xl text-base outline-none py-2 px-4 '
          />
          <div
            className='h-7 w-7 rounded-full absolute top-1/2 left-[85%] transform -translate-y-1/2'
            style={{ backgroundColor: streamData.streamColor }}
          ></div>
        </div>
                </div>
                {isEditing && (
                  <div className="flex flex-col lg:flex-row items-center justify-end mt-4">

                    <button
                      onClick={handleSaveDetails}
                      className={`font-bold py-2 px-4 rounded mr-4 transition-opacity duration-300 ${hasChanges ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-blue-400 text-white opacity-60 cursor-not-allowed'}`}
                      disabled={!hasChanges} // Disable the button if there are no changes
                    >
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 p-8 flex flex-col items-center"> {/* Adjusted container */}
          <div className="bg-white shadow-lg rounded-lg p-6 mx-auto" style={{ maxWidth: '672px' }}>
          <div className="flex  items-center justify-center mb-2">
            <h1 className="text-xl lg:text-3xl font-semibold text-gray-800 self-center">QR Code</h1>
          </div>
          <div className='mb-6'>
            <p>Click on QR to copy the link</p>
          </div>
          <div className='pl-3' onClick={handleCopy}>
          <QRCode value={`http://deafassistant.com/${encodeURIComponent(streamData.streamName)}`} size={180} />
            {copied && <span className='pl-3'>Copied to clipboard!</span>}
          </div>
        </div>
      </div>
        </main>

      </div>
      
    </div>
  );
};

export default Overview;
