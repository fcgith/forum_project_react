// src/Result.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Result() {
  const { state } = useLocation();
  console.log('Result page state:', state); // Log state for debugging

  const success = state?.success;
  const token = state?.token;
  const errorDetails = state?.errorDetails;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">
                {success ? 'Login Successful' : 'Login Failed'}
              </h2>
              {success ? (
                <>
                  <p className="card-text">Your authentication token:</p>
                  <pre className="bg-light p-3 rounded">{token || 'No token provided'}</pre>
                </>
              ) : (
                <div className="text-danger">
                  <p>
                    <strong>Error:</strong> {errorDetails?.message || 'An unexpected error occurred'}
                  </p>
                  <p>
                    <strong>Status Code:</strong> {errorDetails?.status || 'N/A'}
                  </p>
                  <p>
                    <strong>Details:</strong>{' '}
                    {errorDetails?.data
                      ? typeof errorDetails.data === 'object'
                        ? JSON.stringify(errorDetails.data, null, 2)
                        : errorDetails.data
                      : 'No additional details available'}
                  </p>
                </div>
              )}
              <Link to="/" className="btn btn-primary mt-3">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;