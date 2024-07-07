
import connectMongoDB from '@/app/libs/mongodb';
import BlogItems from '@/app/models/BlogItems';
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const { author, title, date_published, content } = await request.json();
  await connectMongoDB();
  await BlogItems.create({ author, title, date_published, content });
  return NextResponse.json({ message: "Blog Item Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const blogItems = await BlogItems.find();
  return NextResponse.json({ blogItems });
}
