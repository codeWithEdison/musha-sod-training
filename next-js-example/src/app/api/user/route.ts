import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
 return new Promise((resolve) =>{
  db.query("SELECT * FROM users", (err, results)=>{
    if(err){
      console.error(err);
      resolve(NextResponse.json({error: " fail to fetch user "}, {status:500}));
    } else{
resolve(NextResponse.json(results, {status:200}));
    }
  })
 })
}

export async function POST(req: Request) {
  return new Promise(async (resolve) => {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      resolve(NextResponse.json({ error: "All fields are required" }, { status: 400 }));
      return;
    }

    db.query(
      "INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())",
      [username, email, password],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          resolve(NextResponse.json({ error: "Failed to create user" }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ message: "User created", id: result.insertId }, { status: 201 }));
        }
      }
    );
  });
}


