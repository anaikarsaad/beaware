// AccountDetails.tsx
import React from 'react';
import Sidebar from './Sidebar'; // Adjust import path as necessary

const AccountDetails: React.FC = () => {
  // Example state for user data (replace with your own state management logic)
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "********" // For display purposes only, do not handle real passwords like this
  };

  // Handlers for Edit and Delete actions
  const handleEditDetails = () => {
    console.log('Edit account details');
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <Sidebar activeItem="profile" />
      <main className="flex-1">
        <div className="container mx-auto p-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">Account details</h1>
              <button onClick={handleEditDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit details
              </button>
            </div>
            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-gray-600">User Namer</label>
                <input type="text" value={userData.name} readOnly className="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label className="text-gray-600">Email</label>
                <input type="email" value={userData.email} readOnly className="w-full mt-1 p-2 border rounded" />
              </div>
              <div>
                <label className="text-gray-600">Password</label>
                <input type="password" value={userData.password} readOnly className="w-full mt-1 p-2 border rounded" />
              </div>
            </div>
            {/* Delete Account Button */}
            <div className="mt-6">
              <button onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountDetails;
