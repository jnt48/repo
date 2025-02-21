import React from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ccddea]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <div className="flex flex-col space-y-4">
          <button
            // onClick={handleGoogleSignIn}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            <FaGoogle className="mr-2" size={20} />
            Sign in with Google
          </button>
          <button
            // onClick={handleGithubSignIn}
            className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            <FaGithub className="mr-2" size={20} />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
