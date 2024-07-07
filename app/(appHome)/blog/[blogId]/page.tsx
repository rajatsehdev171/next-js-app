import React from "react";
import NotFound from "./not-found";
import Link from "next/link";
import { BlogItem } from "../interfaces";

// server side rendered blogs example
async function getBlogById(blogId:string) {
  //process.env.URL this needs to be used for server side fetching only
  console.log("checking process.env", process.env.URL);
  const res = await fetch(process.env.URL + `/api/blog/${blogId} `, {
    method: "GET",
    next: { revalidate: 0 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("trying to check this ---",data.blog)
  return  data.blog;
}

async function BlogIdPage({ params }: any){
  // const blogs: any = await getData();
  // const blogDetailObject = blogs.find(
  //   (blog: any) => blog.id == parseInt(params.blogId)
  // );
  const blogDetailObject:BlogItem = await getBlogById(params.blogId) as any;

  if (blogDetailObject) {
    return (
      <>
        <div>
          <div className="p-5 bg-blue-100 mt-3">
            <h3 className="text-blue-400 mb-4 text-sm font-bold">
              {blogDetailObject.title}
            </h3>

            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h2 className="mb-2 font-bold text-2xl text-gray-600 text-purple">
                Author(<strong>{blogDetailObject.author}</strong>) - Published
                Date:<b>{blogDetailObject.date_published}</b>
              </h2>
              <p className="text-gray-500">{blogDetailObject.content}</p>
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
