"use client"
import React, { useEffect, useState } from "react";
import NotFound from "./not-found";
import { BlogItem } from "../interfaces";
import { getFormattedDate } from "@/app/libs/date-format-util";
import { useRouter } from "next/navigation";
import BlogItems from "@/app/models/BlogItems";


async function BlogIdPage({ params }: { params: {blogId:string}}) {
  // const blogs: any = await getData();
  // const blogDetailObject = blogs.find(
  //   (blog: any) => blog.id == parseInt(params.blogId)
  // );
  console.log("checking params---",params);
  const router = useRouter();
  const [blogItem,setBlogItem] = useState<BlogItem>()

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (!email && !token) {
      router.push("/signin");
    }
    const  getBlogById = async (blogId:string) => {
      //process.env.URL this needs to be used for server side fetching only
      console.log("checking process.env", process.env.URL);
      const headers:any =  {
        method: "GET",
        next: { revalidate: 0 },
        headers: {
          "Content-Type":"application/json",
          "Accept": "application/json",
          "token":localStorage.getItem("token"),
        }
      };
      const res = await fetch(`/api/blog/${blogId} `,{...headers});
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
    
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log("trying to check this ---",data.blog)
      setBlogItem(data.blog);
    }
    getBlogById(params.blogId)
  },[])

  if (blogItem && blogItem.title) {
    return (
      <>
        <div>
          <div className="p-5 bg-blue-100 mt-3">
            <h3 className="text-blue-400 mb-4 text-sm font-bold">
              {blogItem.title}
            </h3>

            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h2 className="mb-2 font-bold text-2xl text-gray-600 text-purple">
                Author(<strong>{blogItem.author}</strong>) - Published
                Date:<b>{getFormattedDate(blogItem.date_published)}</b>
              </h2>
              <p className="text-gray-500">{blogItem.content}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <NotFound />;
}

export default BlogIdPage;

// export async function getStaticProps({ params }:{params:Object}) {
//     console.log("checking--",params)
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`https://.../posts/${params.id}`)
//     const post = await res.json()

//     // Pass post data to the page via props
//     return { props: { post } }
// }
