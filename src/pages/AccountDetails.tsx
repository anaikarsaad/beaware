import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from '../components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {  signOut } from 'firebase/auth';
import LogoImage from '../images/LogoName.png';
const AccountDetails: React.FC = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [user, loading, error] = useAuthState(getAuth(app));
  const [showPasswordConfirmationModal, setShowPasswordConfirmationModal] = useState(false);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const[showLogoutModal,setShowLogoutModal]=useState(false);
  

  

  const cancelDelete = () => {
    setShowConfirmationModal(false); // Close the confirmation modal
  };
  useEffect(() => {
    if (user) {
      const db = getDatabase(app);
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData({ name: data?.name || "N/A", email: user.email || "N/A" });
      }, { onlyOnce: true });
    }
  }, [user]);

  const handleReauthenticateAndDelete = async (password: string) => {
    if (!user || !user.email) return;

    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      // Re-authenticate the user
      await reauthenticateWithCredential(user, credential);
      console.log('Re-authentication successful.');
      // Proceed with deletion
      await deleteUser(user);
      console.log('User account deleted successfully.');

      // Optionally, remove user data from Realtime Database
      const db = getDatabase(app);
      const userRef = ref(db, `users/${user.uid}`);
      await remove(userRef);
      console.log('User data removed from the database.');

      navigate('/login'); // Redirect user to login or sign-up page
    } catch (error) {
      console.error('Error during re-authentication or account deletion:', error);
      alert('Error during re-authentication or account deletion. Please check the console for more details.');
    }
  };

  const handleDeleteAccount = () => {
    
    setShowConfirmationModal(true);
  };

  const toggleLogout=()=>{
    setShowLogoutModal(true);
  }

  const cancelLogout=()=>{
    setShowLogoutModal(false);
  }
  
  const confirmDelete = () => {
    setShowConfirmationModal(false); // Close the confirmation modal first
    setShowPasswordConfirmationModal(true); // Open the password confirmation modal
  };
  const submitPasswordAndDelete = async (password: string) => {
    setShowPasswordConfirmationModal(false); // Close the password confirmation modal
    handleReauthenticateAndDelete(password);
  };
  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      console.log('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header showDeleteButton onDeleteAccount={handleDeleteAccount} />
      <div className="flex flex-1 overflow-auto bg-gray-50">
        <Sidebar activeItem="profile" />
        <main className="flex-1">
        <div className="container mx-auto p-8 pb-0 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 w-[50%] flex justify-center">
          <div className="mb">
          {/* <img src={LogoImage} alt="Logo" className="h-10 mb-2 justify-center" /> */}
                <h1 className="text-3xl font-semibold text-gray-800">Account Details</h1>
              </div>
          </div>
        </div>
          <div className="container mx-auto p-8 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-[50%]">
              {/* <div className="mb-2">
                <h1 className="text-3xl font-semibold text-gray-800">Account Details</h1>
              </div> */}
              <div className="space-y-4">
              <div>
                  <label className="text-gray-600 mb-2">Email</label>
                  <input
                    type="text"
                    value={userData.email}
                    readOnly={true}
                    
                    name="imageUrl"
                    className="w-full bg-gray-100 border focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-2xl text-base outline-none py-2 px-4 mt-3"
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2">Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    readOnly={true}
                    
                    name="imageUrl"
                    className="w-full bg-gray-100 border focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-2xl text-base outline-none py-2 px-4 mt-3"
                  />
                </div>
               
               
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center'>

          
          {!showLogoutModal &&
            <button
            onClick={toggleLogout} // Call handleLogout function on button click
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded self-center w-[148px]"
          >
            Logout
          </button>
          }
          {
            showLogoutModal &&
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg flex flex-col items-center">
                  <p className='text-black font-bold'>Are you sure you want to logout account?</p>
                  <div className="mt-4 flex justify-end">
                    <button onClick={cancelLogout} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4">
                      Cancel
                    </button>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>

          }
          
          </div>
          <div className='flex justify-center items-center'>
         {!showConfirmationModal &&
          <button
                  onClick={handleDeleteAccount}
                  className="mt-4 border-[2px] border-red-500  text-red-500 font-bold py-2 px-4 rounded self-center w-[155px]"
                >
                  Delete Account
                </button>}
                
          </div>
          
          
          
          {showConfirmationModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg flex flex-col items-center">
                  <p className='text-black font-bold'>Are you sure you want to delete your account?</p>
                  <div className="mt-4 flex justify-end">
                    <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4">
                      Cancel
                    </button>
                    <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showPasswordConfirmationModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg flex flex-col items-center">
      <p className='text-black font-bold'>Please confirm your password to delete your account</p>
      <input
        type="password"
        className="mt-2 p-2 border-[1px] rounded w-[80%] border-[#B0B0B0]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-4 flex justify-end">
        <button onClick={() => setShowPasswordConfirmationModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4">
          Cancel
        </button>
        <button onClick={() => submitPasswordAndDelete(password)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>
  </div>
)}
        </main>
      </div>
    </div>
  );
};

export default AccountDetails;
