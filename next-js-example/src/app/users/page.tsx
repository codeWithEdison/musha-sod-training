"use client"

import React, { useEffect, useState } from "react";


interface User {
    id: number;
    username: string;
    email: string;
    create_at: string
  }

  // export const  users: User[] = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     age: 30,
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     age: 28,
  //   },
    
  //   {
  //     id: 3,
  //     name: "Bob Johnson",
  //     email: "bob.johnson@example.com",
  //     age: 35,
  //   },
  // ];

const Users = () => {
const [users, setusers] = useState<User[]>([]);
const [loading, setloading] = useState(true);

useEffect(()=>{
  const fetchUsers = ()=>{
    fetch("/api/user")
    .then((response) => response.json())
    .then((data: User[])=> setusers(data))
    .catch((error) => console.error("Error fetching users:", error))
    .finally(() => setloading(false));
  }
  fetchUsers()
},[])

  if(loading){
    return <div className=" text-center text-red-500">Loading...</div>
  }

  return (
    <div className=" bg-gray-50">
      {users.map((user) => {
        return (
          <div key={user.id} className=" shadow-md bg-white p-4 m-4 rounded-lg">
           <h2 className=" text-md font-bold text-black ">{user.username}</h2>
            <p className=" text-sm font-bold text-black ">Email: {user.email}</p>
            <p className=" text-sm font-bold text-black ">Age: {user.create_at}</p>
            {/* <p>{user.address}</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default Users;
