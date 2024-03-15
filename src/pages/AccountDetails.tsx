import React, { useState,useEffect } from 'react';
import Sidebar from './Sidebar'; // Adjust import path as necessary
import Header from '../components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue, update ,remove} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

interface AccountDetailsProps {
  // Define props if needed
}

const AccountDetails: React.FC<AccountDetailsProps> = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
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
          setUserData({
            name: data.name,
            email: data.email,
          });
        } else {
          console.error('No data available for this user.');
        }
      }, (error) => {
        console.error('Firebase read failed: ', error);
      });
    }
  }, [user]);
  // Handlers for Edit, Save and Delete actions
  const handleEditDetails = () => {
    setIsEditing(true);
  };

  const handleSaveDetails = () => {
    setIsEditing(false); // Turn off editing mode
    // Perform save action, e.g., save to database
    console.log('Saved:', userData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Turn off editing mode
    // Reset user data to its original state
    setUserData({
      name: "John Doe",
      email: "john.doe@example.com",
      
    });
  };
 
  const handleDeleteAccount = async () => {
    // try {
    //   if (!user) {
    //     console.error('No user is currently logged in.');
    //     return;
    //   }
  
    //   // Reauthenticate user (if required)
    //   const credential = promptForReauthentication(); // You need to implement this function
    //   if (!credential) {
    //     console.error('User did not reauthenticate. Account deletion aborted.');
    //     return;
    //   }
  
    //   // Delete user from authentication
    //   await auth.currentUser?.reauthenticateWithCredential(credential);
    //   await auth.currentUser?.delete();
  
    //   // Optionally, delete user data from database
    //   const db = getDatabase();
    //   await remove(ref(db, `users/${user.uid}`));
  
    //   // Navigate to login page or perform any other actions as needed
    //   navigate('/login');
    // } catch (error: any) {
    //   console.error('Error deleting account:', error.message);
    // }
  };
  
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value); 
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className=''>
      <Header showDeleteButton={true} onDeleteAccount={handleDeleteAccount}/>
      <div className="bg-gray-50 min-h-screen flex ">
        <Sidebar activeItem="profile" />
        <main className="flex-1 ">
          <div className="container mx-auto p-8 w-[60%]">
            <div className="bg-white shadow-lg rounded-lg p-6 h-[380px]">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-semibold text-gray-800">Account details</h1>
                {!isEditing && (
                  <button onClick={handleEditDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                )}
              </div>
              <div className='mb-6'>
                <p>Your information will be displayed here</p>
              </div>
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 mb-2">Name of the user</label>
                  <input
                    type="text" value={userData.name} readOnly={!isEditing} onChange={handleInputChange} name="name"
                    className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-3"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2">Email</label>
                  <input
                    type="email" value={userData.email} readOnly={!isEditing} onChange={handleInputChange} name="email"
                    className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-3"
                  />
                </div>
                {isEditing && (
                  <div className="flex items-center justify-end">
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
        </main>
      </div>
    </div>
  );
};

export default AccountDetails;
