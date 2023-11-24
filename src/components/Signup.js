import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:4000/register', {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        console.log('User registered successfully');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
        <h2>Register</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={register}>Register</button>
    </div>
  )
}

export default Signup;