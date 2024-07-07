'use client'
import React from 'react';
import {useRouter} from 'next/navigation';
import "./button.css";
import { BlogItem } from '@/app/(appHome)/blog/interfaces';


function Button({blog}:{blog?:BlogItem}) {
    const router = useRouter()
    const onClickHandler = () => {
        // Retrieve the object from storage
        // let blogsObject:any = localStorage.getItem('blogs');
        // let parsedBlogsObj = blogsObject ? JSON.parse(blogsObject) : {};
        // if(!parsedBlogsObj || !parsedBlogsObj[blog.id]){
        //     parsedBlogsObj[blog.id] = blog;
        //     localStorage.setItem('blogs', JSON.stringify(parsedBlogsObj));
        // }
        router.push(`/blog/${blog?blog?._id:'add'}`)
    }
    return (
        <button onClick={onClickHandler} className='button-type text-blue-600 visited:text-purple-600'>{blog?'Read More':'Add Blog +'}</button>
    );
}

export default Button;