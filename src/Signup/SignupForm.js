import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css'; // Import the CSS file

const SignupForm = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EnterName, setEnterName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://167.99.62.218:5000/api/signup', {
        email,
        password,
        EnterName, // Include displayName in the request
      });

      const token = response.data.token;

      // Save the token to localStorage or cookies for future requests
      localStorage.setItem('token', token);

      // Update the state or trigger a callback to update the authenticated status
      onSignup();
    } catch (error) {
      setErrorMessage('Invalid name, email, or  password. Please try again.');
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="SignupForm-container">
      <form onSubmit={handleSignup}>

      <div className="form-group">
          <label className="label" htmlFor="EnterName">
            Enter Name:
          </label>
          <input
            className="input"
            type="text"
            id="EnterName"
            value={EnterName}
            onChange={(e) => setEnterName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="email">
            Email:
          </label>
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">
            Password:
          </label>
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">
          Signup
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default SignupForm;