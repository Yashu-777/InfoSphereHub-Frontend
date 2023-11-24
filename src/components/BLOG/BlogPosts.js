import React, { useState } from "react";
import axiosInt from '../../Axios/axiosIntercept';

function BlogPosts() {
  const [protectedMessage, setProtectedMessage] = useState('');
  const [user, setUser] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const accessProtectedRoute = async () => {
    try {
      const response = await axiosInt.get(`${baseUrl}/protected`);

      if (response.status === 200) {
        const data = response.data;
        setProtectedMessage(data.message);
        setUser(data.user); // Set the user information in the state
      } else {
        console.error('Failed to access protected route');
        setProtectedMessage('Access denied');
      }
    } catch (error) {
      console.error('Error accessing protected route:', error);
      setProtectedMessage('Error accessing protected route');
    }
  };

  return (
    <div>
      <div>
        <h2>Access Protected Route</h2>
        <button onClick={accessProtectedRoute}>
          Access Protected Route
        </button>
        <div>
          <strong>Protected Message:</strong> {protectedMessage}
        </div>
        
        {/* Display user information */}
        {user && (
          <div>
            <strong>Username:</strong> {user.username}
            {/* Add other user properties as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPosts;
