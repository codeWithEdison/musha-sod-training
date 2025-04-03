"use client"
import React from 'react'
// import { useRouter } from 'next/router'
import { users } from '../page';
import { useParams } from 'next/navigation';

const UserDetails = () => {
    // const router = useParams();
    

    const { id }= useParams();

    const user = users.find((user) => user.id === Number(id));
  if(!id){
    return <div className=' text-center text-red-500'>Loading...</div>
  }
    if(!user){
        return <div className=' text-center text-red-500'>User not found</div>
    }
  return (
    <div className="bg-gray-50 p-6">
      <div className="shadow-md bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-black">{user.name}</h2>
        <p className="text-md text-gray-700">Email: {user.email}</p>
        <p className="text-md text-gray-700">Age: {user.age}</p>
      </div>
    </div>
  )
}

export default UserDetails;