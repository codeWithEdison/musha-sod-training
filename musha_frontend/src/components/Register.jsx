import React from 'react';

const Register = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200'>
        <h1 className='text-2xl font-bold text-center text-gray-700 mb-6'>Register</h1>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-medium mb-2'>Email</label>
            <input 
              type='email' 
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none' 
              placeholder='Enter your email' 
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-medium mb-2'>Username</label>
            <input 
              type='text' 
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none' 
              placeholder='Enter your username' 
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-600 text-sm font-medium mb-2'>Password</label>
            <input 
              type='password' 
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none' 
              placeholder='Enter your password' 
            />
          </div>
          <button 
            type='submit' 
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-300'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
