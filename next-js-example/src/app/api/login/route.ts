import { NextResponse } from "next/server";
import connection from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Change this to a secure key

export async function POST(req: Request) {
  return new Promise(async (resolve) => {
    const { email, password } = await req.json();

    if (!email || !password) {
      resolve(NextResponse.json({ error: "Email and password are required" }, { status: 400 }));
      return;
    }

    connection.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        resolve(NextResponse.json({ error: "Database error" }, { status: 500 }));
        return;
      }

      if (results.length === 0) {
        resolve(NextResponse.json({ error: "User not found" }, { status: 404 }));
        return;
      }

      const user = results[0];

      // Compare password
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        resolve(NextResponse.json({ error: "Invalid password" }, { status: 401 }));
        return;
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

      resolve(NextResponse.json({ message: "Login successful", token }, { status: 200 }));
    });
  });
}
