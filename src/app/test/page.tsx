'use client';

import React, { useState } from 'react';

const Page = () => {
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'johgj@example.com',
          password: 'secret123',
          password_confirmation: 'secret123'
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData);
        setMessage('Error registering user');
        return;
      }

      const data = await res.json();
      console.log(data);
      setMessage('Registered successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Network or server error');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
};

export default Page;
