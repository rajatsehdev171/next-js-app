import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from '@/app/models/Users';
import connectMongoDB from '@/app/libs/mongodb';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectMongoDB();

  const result = await req?.json();
  const { email, password } = result;

  try {
    const user = await Users.findOne({ email });

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!user || !isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const token = await jwt.sign({ userId: user._id }, "secretkey");
    const userResponse = {
      email: user?.email,
      token: token,
    };
    console.log("checking0--- user response",userResponse);
     return NextResponse.json(
      { user: JSON.parse(JSON.stringify(userResponse)), statusCode: "200" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 422 }
    );
  }
}
