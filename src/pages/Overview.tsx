import React, { useState,useEffect } from 'react';
import QRCode from 'qrcode.react'; // Import QRCode component
import Sidebar from './Sidebar'; // Adjust import path as necessary
import Header from '../components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue ,update} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
interface OverviewProps {
  name: string;
  imageUrl: string;
  qrCodeData: string;
}

const Overview: React.FC<OverviewProps> = ({ name: initialName, imageUrl: initialImageUrl, qrCodeData }) => {
  const [streamData, setStreamData] = useState({
    streamName: initialName,
    imageUrl:initialImageUrl,
    streamColor: '' // Initial stream color
  });
 
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

  const handleSaveDetails = () => {
    setIsEditing(false);
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
      streamName: initialName,
      imageUrl: initialImageUrl,
      streamColor: '#000000'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStreamData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen flex flex-col lg:flex-row">
      <Sidebar activeItem="overview" />
      <main className="flex flex-col lg:flex-row flex-1">
        <div className="flex-1 p-8">
          <div className="bg-white shadow-lg rounded-lg p-6 h-auto lg:h-[480px] mx-auto mb-6 lg:mb-0" style={{ maxWidth: '672px' }}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <h1 className="text-xl lg:text-3xl font-semibold text-gray-800">Stream Details</h1>
                {!isEditing && (
                   <><button
                   onClick={() => window.open('https://www.researchgate.net/publication/359606643_Deaf_Helper_Mobile_Application_for_Interaction_of_Hearing_Disorders_Communities', '_blank')}
                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 lg:mt-0 lg:mr-4"
                 >
                   Read Instructions
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
                    className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-3"
                    
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
                    className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-3"
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2">Stream Color</label>
                  <input
                    type="color"
                    value={streamData.streamColor}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    name="streamColor"
                    className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out mt-3"
                  />
                </div>
                {isEditing && (
                  <div className="flex flex-col lg:flex-row items-center justify-end mt-4">

                    <button onClick={handleSaveDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
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
          <div className="flex-1 p-8"> {/* Adjusted container */}
          <div className="bg-white shadow-lg rounded-lg p-6 mx-auto" style={{ maxWidth: '672px' }}>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl lg:text-3xl font-semibold text-gray-800">QR Code</h1>
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
