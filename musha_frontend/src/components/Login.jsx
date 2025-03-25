import React, { useState } from "react";
import api from "../lib/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleLogin = async (e)=>{
 e.preventDefault();
    setLoading('true');
   try{
    const response = await api.post('/login',{
      username,
      password
    });
    if(response.statusCode === 200){
        setError(response.data.message)
    }
    localStorage.setItem('musha_token', response.data.token)
   } catch(e){
     setError(e.message);
     } finally{
      setLoading(false);
     }
   }
  

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h1>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <form 
        onSubmit={HandleLogin}
        >
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <p>
            username: {username} <br />
            password: {password}
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-300"
          >
            {loading ? "sign in ..." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
