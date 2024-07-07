'use client'
import React from 'react';
import "./card.css";
import Button from '../button/button';
import { BlogItem } from '@/app/(appHome)/blog/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


function Card({blog}:any) {
  const router = useRouter();
   const trimChars = (contentStr:string) => {
    return `${contentStr.length>25?contentStr.substring(0, 50):''}...`
   }
   
   const delBlogItem = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        next: { revalidate: 0 },
      });
      if (response.ok) {
        router.refresh()
      } else {
        throw new Error("Failed to delete blog post");
      }
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div className="card">
        {/* <img src="" alt="Avatar" style={{width:'100%'}} /> */}
        <div className="card-text-container mt-2">
          <h3>{blog.author}</h3>
          <h5>Author(<strong>{blog.author}</strong>) - Published Date:<b>{blog.date_published}</b></h5>
          <p>{trimChars(blog.content)}</p>
        </div>
        <div className="relative bottom-0 left-0">
                  <button
                    onClick={() => delBlogItem(blog._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded absolute bottom-0 left-0"
                  >
                    Delete
                  </button>
                  <div className='absolute bottom-2 right-37'>
                  <Button blog={blog}/>
                  </div>
                  <Link
                    href={`/blog/edit/${blog._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded absolute bottom-0 left-0"
                  >
                    Edit
                  </Link>
                </div>
      </div>
    );
}

export default Card;