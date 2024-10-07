// 4. Login Form Validation: Handle login validation and display success message based on 
// state using useState.


import React, { useState } from 'react';

const Task4 = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');


    if (email === 'user@example.com' && password === 'password') {
      setSuccess('Login successful!');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="container mt-5 w-50">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-30">Login</button>
      </form>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
      {success && <p className="text-success text-center mt-3">{success}</p>}
    </div>
  );
};

export default Task4;
