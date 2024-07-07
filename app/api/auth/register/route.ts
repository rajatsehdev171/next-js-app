import bcrypt from "bcrypt";
import Users from '@/app/models/Users';
import connectMongoDB from '@/app/libs/mongodb';
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  await connectMongoDB();

  const result = await req?.json();

  const { email, password, name } = result;

  try {
    // Check if username already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    await Users.create({ name, email, password: hashedPassword });

    // // Generate JWT token
    // const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'secretkey');

    // Return response
    return NextResponse.json({ statusCode: "200" }, { status: 200 });
  } catch (error) {
    console.error("Error registering user:", error);
    // Return error response
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
