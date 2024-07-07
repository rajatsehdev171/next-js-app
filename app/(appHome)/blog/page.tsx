import React, { Fragment } from "react";
import Card from "@/app/components/card/card";
import { BlogItem } from "./interfaces";
import Button from "@/app/components/button/button";
import BlogItems  from "../../models/BlogItems";
import connectMongoDB from "../../libs/mongodb";

// server side rendered blogs example
export async function getData() {
  //process.env.URL this needs to be used for server side fetching only
  console.log("checking process.env", process.env.URL);
  // const res = await fetch(process.env.URL + "/api/blog", {
  //   method: "GET",
  //   next: { revalidate: 0 },
  // });
  await connectMongoDB();
  const blogItems = await BlogItems.find().lean();
  const res =  JSON.parse(JSON.stringify({ blogItems:blogItems }));
  console.log("helloo--",blogItems,res)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }
  // const data = await res.json();
  return  res.blogItems;
}

export default async function Blogs() {
  const blogs:any = await getData();
  console.log("rendering check---", blogs && blogs.length > 0, typeof(blogs));
  // Render post...
  return (
    <div>
      <div className="inline-flex">
        <h2 className="mb-4">Blogs:</h2>
        <div className="ml-4">
        <Button  />
        </div>
      </div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog:BlogItem) => (
          <Fragment key={blog._id}>
            <Card blog={blog} />
          </Fragment>
        ))
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Not Found! </strong>
          <span className="block sm:inline mr-2">Please create some blogs</span>
        </div>
      )}
    </div>
  );
}

//   export async function getStaticPaths() {
//     // ...
//   }

//   // This also gets called at build time
//   export async function getStaticProps({ params }) {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`https://.../posts/${params.id}`)
//     const post = await res.json()

//     // Pass post data to the page via props
//     return { props: { post } }
//   }
