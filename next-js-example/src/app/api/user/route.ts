import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello, welcome to Next.js API",
  });
}
