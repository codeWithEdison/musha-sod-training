import React from "react";


interface User {
    id: number;
    name: string;
    email: string;
    age: number;
  }

  export const  users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      age: 28,
    },
    
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      age: 35,
    },
  ];

const page = () => {


  return (
    <div className=" bg-gray-50">
      {users.map((user) => {
        return (
          <div key={user.id} className=" shadow-md bg-white p-4 m-4 rounded-lg">
           <h2 className=" text-md font-bold text-black ">{user.name}</h2>
            <p className=" text-sm font-bold text-black ">Email: {user.email}</p>
            <p className=" text-sm font-bold text-black ">Age: {user.age}</p>
            {/* <p>{user.address}</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default page;
