import React from 'react';

function BlogDetailLayout({children}: Readonly<{
    children: React.ReactNode,params:any
  }>) {
    return (<div className= 'blog-detail-page-layout'>
                {children}
            </div>);
}

export default BlogDetailLayout;

// export async function getStaticProps({ params }:{params:Object}) {
//     console.log("checking--",params)
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`https://.../posts/${params.id}`)
//     const post = await res.json()
   
//     // Pass post data to the page via props
//     return { props: { post } }
// }