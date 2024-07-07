"use client";

import React, { Fragment, useEffect, useState } from "react";
import Card from "@/app/components/card/card";
import { BlogItem } from "./interfaces";
import Button from "@/app/components/button/button";
import {useRouter} from "next/navigation";
// import BlogItems  from "../../models/BlogItems";
// import connectMongoDB from "../../libs/mongodb";

// // server side rendered blogs example
// export async function getData() {
//   //process.env.URL this needs to be used for server side fetching only
//   console.log("checking process.env", process.env.URL);
//   // const res = await fetch(process.env.URL + "/api/blog", {
//   //   method: "GET",
//   //   next: { revalidate: 0 },
//   // });
//   await connectMongoDB();
//   const blogItems = await BlogItems.find().lean();
//   const res =  JSON.parse(JSON.stringify({ blogItems:blogItems }));
//   console.log("helloo--",blogItems,res)
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   // if (!res.ok) {
//   //   // This will activate the closest `error.js` Error Boundary
//   //   throw new Error("Failed to fetch data");
//   // }
//   // const data = await res.json();
//   return  res.blogItems;
// }
//async components not supported for client side components
export default function Blogs() {
  const [blogData, setBlogData] = useState<BlogItem[]>([]);
  const [isLoading, setLoader] = useState<boolean>(true);
  const router = useRouter();
  // const initialized = useRef(false)
  //to handle twice calling of use effect
  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (!email && !token) {
      router.push("/signin");
    }
    const fetchBlogData = async () => {
      try {
        setLoader(true);
        const headers:any = {
          "Content-Type":"application/json",
          "Accept": "application/json",
          "token":localStorage.getItem("token"),
        }
        const response = await fetch("/api/blog",{...headers});
        if (response.ok) {
          const data = await response.json();
          setBlogData(data.blogItems);
          setLoader(false)
        } else {
          setLoader(false);
          throw new Error("Failed to fetch blog data");
        }
      } catch (error) {
        setLoader(false);
        console.error(error);
      }
    };

    fetchBlogData();
  }, []);

  const deleteFunCall = (id:string) => {
    setBlogData((prevData) => prevData.filter((post) => post._id !== id));
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
console.log("checking blogData---",blogData);
  return (
    <div>
      <div className="inline-flex">
        <h2 className="mb-4">Blogs:</h2>
        <div className="ml-4">
          <Button />
        </div>
      </div>
      {blogData && blogData.length > 0 ? (
        blogData.map((blog: BlogItem) => (
          <Fragment key={blog._id}>
            <Card blog={blog} deleteFunc={deleteFunCall}/>
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


//To revalidate tag we can use client side components
// It is possible to revalidate a tag from within the client.

// Create a server component that revalidates the tag:

// "use server";

// import { revalidateTag as revalidate } from "next/cache";

// async function revalidateTag(name) {
//     revalidate(name);
// }

// export default revalidateTag;
// Then create a client component that triggers that tag revalidation function

// "use client";

// import React from "react";

// import revalidateTag from "./revalidateTag";

// function CurrencySelector() {
//     function setCurrency() {
//         // Set the currency in the cookies or state
//         // And revalidate the prices
//         revalidateTag("calculatePrices");
//     }

//     return <button onClick={() => setCurrency("EUR")}>Set currency to EUR</button>;
// }

// export default CurrencySelector;
// The tag was defined in a fetch function

// const response = await fetch(`blablabla/api/calculate-prices`, {
//    method: "POST",
//    headers: {
//       "Content-Type": "application/json",
//    },
//    body: JSON.stringify({ dateStart: utcDateStart, dateEnd: utcDateEnd, propertyID, currency }),
//    next: { tags: ["calculatePrices"] },
// });
