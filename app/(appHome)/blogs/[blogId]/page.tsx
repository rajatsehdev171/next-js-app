import {getData} from '@/app/(appHome)/blogs/page';
import React from 'react';
import NotFound from './not-found';
import Link from 'next/link';


async function BlogIdPage({params}:any) {
    const blogs:any = await getData();
    const blogDetailObject = blogs.find((blog:any) =>blog.id == parseInt(params.blogId));
    console.log("checke888----",params,blogs[0],blogDetailObject); 
    if(blogDetailObject){
    return (
        <>
        <div>
            <div>
            <h2>Blog Detail Page: <Link href="/blogs" className='text-blue-600 visited:text-purple-600 float-right'>Go Back</Link></h2>
            <section>
                <div className="detail-container">
                    <h2>{blogDetailObject.title}</h2>
                    <h5>Author(<strong>{blogDetailObject.author}</strong>) - Published Date:<b>{blogDetailObject.date_published}</b></h5>
                    <p>{blogDetailObject.content}</p>
                </div>
            </section>
            </div>
        </div>
        </>
    );
}
return <NotFound/>
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