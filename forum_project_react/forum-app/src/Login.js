// src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Form submitted with:', { username, password });

    // Create form data
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    console.log('Form data prepared:', formData.toString());

    try {
      console.log('Sending request to API via proxy...');
      const response = await axios.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Log the entire response
      console.log('API Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      });

      // Check for token
      if (response.status === 200 && response.data) {
        const token =
          response.data.access_token ||
          response.data.token ||
          response.data.accessToken ||
          response.data.jwt ||
          'Token not found in expected keys';
        console.log('Token extracted:', token);

        console.log('Navigating to /result with success state...');
        navigate('/result', {
          state: {
            success: true,
            token,
          },
        });
      } else {
        throw new Error('Response status not 200 or data missing');
      }
    } catch (err) {
      console.error('Login Error caught:', {
        message: err.message,
        response: err.response
          ? {
              status: err.response.status,
              data: err.response.data,
              headers: err.response.headers,
            }
          : 'No response available',
        code: err.code,
        stack: err.stack,
      });

      const message =
        err.response?.status === 400
          ? 'Invalid credentials or request'
          : err.response?.status === 500
          ? 'Server error: Unable to process login'
          : err.message || 'Failed to process login';

      const errorDetails = {
        message,
        status: err.response?.status || 'N/A',
        data: err.response?.data || err.message || 'No additional data',
      };

      console.log('Navigating to /result with error state:', errorDetails);
      navigate('/result', {
        state: {
          success: false,
          errorDetails,
        },
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Log In</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Log In
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;