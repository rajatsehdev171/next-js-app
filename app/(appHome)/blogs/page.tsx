import React, { Fragment } from "react";
import Card from "@/components/card/card";

export async function getData() {
  const res = await fetch("https://dummyapi.online/api/blogposts", {
    next: { revalidate: 3600 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Blogs() {
  const blogs = await getData();
  console.log("rendering check---", blogs);
  // Render post...
  return(<div>
    <h2>Blogs:</h2>
    {blogs &&
      blogs.map((blog: { id: React.Key | null | undefined }) => (
        <Fragment key={blog.id}>
          <Card blog={blog} />
        </Fragment>
      ))}
  </div>);
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
