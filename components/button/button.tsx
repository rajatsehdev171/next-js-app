'use client'
import React from 'react';
import {useRouter} from 'next/navigation';
import "./button.css";


function Button({blog}:any) {
    const router = useRouter()
    const onClickHandler = () => {
        // Retrieve the object from storage
        // let blogsObject:any = localStorage.getItem('blogs');
        // let parsedBlogsObj = blogsObject ? JSON.parse(blogsObject) : {};
        // if(!parsedBlogsObj || !parsedBlogsObj[blog.id]){
        //     parsedBlogsObj[blog.id] = blog;
        //     localStorage.setItem('blogs', JSON.stringify(parsedBlogsObj));
        // }
        router.push(`/blogs/${blog?.id}`)
    }
    return (
        <button onClick={onClickHandler} className='button-type'>Read More</button>
    );
}

export default Button;