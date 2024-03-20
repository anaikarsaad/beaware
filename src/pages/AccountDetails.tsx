import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from '../components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AccountDetails: React.FC = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [user, loading, error] = useAuthState(getAuth(app));
  const navigate = useNavigate();

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
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmation || !user) return;

    // Prompt for the user's password to re-authenticate
    const password = prompt("Please enter your password to confirm:");
    if (password) {
      handleReauthenticateAndDelete(password);
    } else {
      console.log('Account deletion cancelled.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Header showDeleteButton onDeleteAccount={handleDeleteAccount} />
      <div className="bg-gray-50 min-h-screen flex">
        <Sidebar activeItem="profile" />
        <main className="flex-1">
          <div className="container mx-auto p-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="mb-2">
                <h1 className="text-3xl font-semibold text-gray-800">Account Details</h1>
              </div>
              <div className="space-y-4">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                {/* <button
                  onClick={handleDeleteAccount}
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Account
                </button> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountDetails;
