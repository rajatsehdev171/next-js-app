import connectMongoDB from "@/app/libs/mongodb";
import BlogItems from "@/app/models/BlogItems";
import { NextRequest, NextResponse } from "next/server";
import { Params } from '@/app/(appHome)/blog/interfaces';
import { revalidatePath } from "next/cache";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    
    const { author, title, date_published, content } = await request.json();

    console.log('Data new', author, id);
    
    await connectMongoDB();

    const updatedPost = await BlogItems.findByIdAndUpdate(id, { author, title, date_published, content }, { new: true });

    if (!updatedPost) {
      return NextResponse.json({ message: "Blog item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Blog Item updated", updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog item:", error);
    return NextResponse.json({ message: "Failed to update blog item" }, { status: 500 });
  }
}


export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await connectMongoDB();
  
  const blog = await BlogItems.findOne({ _id: id });
  return NextResponse.json({ blog }, { status: 200 });
}

export async function DELETE(request: NextRequest, {params}:any) {
  console.log("delete id checking---",params)
  // const id = request.nextUrl.searchParams.get("id");
  const id = params.id;
  await connectMongoDB();
  await BlogItems.findByIdAndDelete(id);
  //after delete revalidate path is required to update the get blogs screen
  revalidatePath("/blog") 
  return NextResponse.json({ message: "Blog Item deleted" }, { status: 200 });
}