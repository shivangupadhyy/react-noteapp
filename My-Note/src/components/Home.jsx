import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to My-Notes</h1>
      <p className="text-lg text-gray-600 mb-4">Your personal cloud-based note-taking solution.</p>
      <div className="space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
          onClick={() => navigate('/signup')}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Home;
