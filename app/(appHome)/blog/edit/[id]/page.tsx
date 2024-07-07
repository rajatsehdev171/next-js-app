// pages/blog/edit/[id]/page.tsx
"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import BlogForm from '@/app/components/blogForm/blog-form';
import { BlogItem } from '../../interfaces';

const EditBlogPost: React.FC = () => {
  const pathname = usePathname();
  const blogId = pathname.split('/')[3];

  const [post, setPost] = useState<BlogItem | null>(null);

  useEffect(() => {
    if (blogId) {
      const fetchPost = async () => {
        const response = await fetch(`/api/blog/${blogId}`);
        const data = await response.json();
        setPost(data.blog);
      };

      fetchPost();
    }
  }, [blogId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return <BlogForm post={post} />;
};

export default EditBlogPost;
