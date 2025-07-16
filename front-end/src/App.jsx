import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', formData);
      setSuccessMessage('User registered successfully!');
      setFormData({ username: '', email: '', phone: '' });
    } catch (err) {
      setSuccessMessage('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Signup Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px' }}>Enter your name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px' }}>Enter your email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '130px' }}>Enter your phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: '8px' }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </form>

        {successMessage && (
          <div style={{
            marginTop: '20px',
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '12px 20px',
            borderRadius: '5px',
            border: '1px solid #c3e6cb',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;




