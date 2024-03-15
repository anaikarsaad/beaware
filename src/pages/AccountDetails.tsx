import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from '../components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { app } from '../firebase';

const AccountDetails: React.FC = () => {
  const [showReauthPrompt, setShowReauthPrompt] = useState(false);
  const [reauthPassword, setReauthPassword] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useAuthState(getAuth(app));

  useEffect(() => {
    if (user) {
      const db = getDatabase(app);
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData({ name: data?.name || "", email: data?.email || user.email });
      }, { onlyOnce: true });
    }
  }, [user]);

  const handleSaveDetails = async () => {
    setIsEditing(false); // Turn off editing mode
    if (!user) {
      console.error("No user is logged in.");
      return;
    }
  
    try {
      await updateEmail(user, userData.email); // Updates the user's email
      console.log('User email updated successfully in Auth');
    } catch (error: any) {
      const errorCode = (error as { code?: string }).code;
      if (errorCode === 'auth/requires-recent-login') {
        console.error('Please re-authenticate to update your email.');
        setShowReauthPrompt(true); // Show re-authentication prompt
      } else {
        console.error('Error updating user email:', error);
      }
    }
  };

  const handleReauthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return; // Add this check to ensure 'user' is not null
    
    const credential = EmailAuthProvider.credential(user.email!, reauthPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      console.log('User re-authenticated successfully.');
      setShowReauthPrompt(false); // Hide the re-authentication prompt
      setReauthPassword(""); // Clear the password field
      await handleSaveDetails(); // Attempt to save details again
    } catch (error) {
      console.error('Re-authentication failed:', error);
    }
  };

  const handleEditDetails = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };
  return (
    <div>
      <Header showDeleteButton={true} onDeleteAccount={() => {}} /> {/* Implement deletion logic */}
      <div className="bg-gray-50 min-h-screen flex">
        <Sidebar activeItem="profile" />
        <main className="flex-1">
          <div className="container mx-auto p-8 w-[60%]">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-semibold text-gray-800">Account Details</h1>
                {!isEditing && (
                  <button
                    onClick={handleEditDetails}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {/* <div>
                  <label className="text-gray-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className="w-full mt-2 p-2 border rounded"
                  />
                </div> */}
                <div>
                  <label className="text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className="w-full mt-2 p-2 border rounded"
                  />
                </div>
                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleSaveDetails}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      {showReauthPrompt && (
        <div className="reauth-modal" style={{ /* Modal styling here */ }}>
          <form onSubmit={handleReauthSubmit}>
            <label>Password:</label>
            <input
              type="password"
              value={reauthPassword}
              onChange={(e) => setReauthPassword(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowReauthPrompt(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default AccountDetails;
