import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import QRCode from 'qrcode.react';
import { app } from '../firebase'; 


const Dashboard = () => {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [details, setDetails] = useState({ name: '', imageUrl: '', color: '#000000' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setDetails({
            name: data.name,
            imageUrl: data.imageLink,
            color: data.color,
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
  
  const handleCopy = () => {
    navigator.clipboard.writeText(details.imageUrl)
      .then(() => setCopied(true))
      .catch(err => console.error('Copying to clipboard failed: ', err));
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Please sign in.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* ...sidebar and other elements */}
      
      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">Basic Information</h1>
          <div className="flex flex-wrap -mx-2">
            {/* Image Upload Section */}
            <div className="w-full lg:w-1/3 px-2 mb-4">
              <div className="flex flex-col items-center justify-center h-48 bg-gray-100 rounded-lg border border-gray-200">
                <button className="text-purple-600 hover:text-purple-700">
                  Add image
                </button>
              </div>
            </div>
            {/* Stream Details Section */}
            <div className="w-full lg:w-1/3 px-2 mb-4">
              <div className="p-4 border rounded-lg h-auto relative bg-white">
                <h2 className="text-lg font-medium mb-2">Stream details</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image-name">
                    Name of the image
                  </label>
                  <input
                    id="image-name"
                    type="text"
                    value={details.name}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly // make this editable as per your requirement
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image-url">
                    Image URL
                  </label>
                  <input
                    id="image-url"
                    type="text"
                    value={details.imageUrl}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly // make this editable as per your requirement
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color-picker">
                    Pick a color
                  </label>
                  <input
                    id="color-picker"
                    type="color"
                    value={details.color}
                    onChange={(e) => setDetails({ ...details, color: e.target.value })}
                    className="w-full h-8"
                  />
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => { /* logic to handle editing */ }}
                >
                  Edit details
                </button>
              </div>
            </div>
            {/* QR Code Section */}
            <div className="w-full lg:w-1/3 px-2 mb-4">
              <div className="flex flex-col items-center p-4 border rounded-lg h-auto bg-white">
                  <QRCode value={details.imageUrl} size={128} fgColor={details.color} />
              <button
                onClick={handleCopy}
              >
                Copy link
              </button>
              {copied && <span>Copied to clipboard!</span>}
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

