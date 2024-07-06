'use client'
import React from 'react';
import "./card.css";
import Button from '../button/button';


function Card({blog}:any) {
   const trimChars = (contentStr:string) => {
    return `${contentStr.substring(0, 50)}...`
   }

    return (
        <div className="card">
        {/* <img src="" alt="Avatar" style={{width:'100%'}} /> */}
        <div className="card-text-container">
          <h3>{blog.title}</h3>
          <h5>Author(<strong>{blog.author}</strong>) - Published Date:<b>{blog.date_published}</b></h5>
          <p>{trimChars(blog.content)}</p>
        </div>
        <Button blog={blog}/>
      </div>
    );
}

export default Card;