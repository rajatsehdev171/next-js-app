// components/BlogForm.tsx
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogItem } from '@/app/(appHome)/blog/interfaces';

interface BlogFormProps {
  post?: BlogItem;
}

const BlogForm: React.FC<BlogFormProps> = ({ post }) => {
  const formatDate = (isoString: string) => {
    return isoString.split("T")[0];
  };

  const [author, setAuthor] = useState(post?.author || "");
  const [title, setTitle] = useState(post?.title || "");
  const [datePublished, setDatePublished] = useState(
    post?.date_published ? formatDate(post.date_published) : ""
  );
  const [content, setContent] = useState(post?.content || "");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const BlogItemData = {
      author,
      title,
      date_published: new Date(datePublished),
      content,
    };

    try {
      if (post?._id) {
        // Update existing post
        const response = await fetch(`/api/blog/${post._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(BlogItemData),
        });

        console.log("Blogs", BlogItemData);

        if (!response.ok) {
          throw new Error("Failed to update the blog post");
        }
      } else {
        // Create new post
        const response = await fetch("/api/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(BlogItemData),
        });

        if (!response.ok) {
          throw new Error("Failed to create the blog post");
        }
      }
      router.push("/blog"); // Redirect to the main blog page or another appropriate page
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="author"
        >
          Author
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="datePublished"
        >
          Date Published
        </label>
        <input
          id="datePublished"
          type="date"
          value={datePublished}
          onChange={(e) => setDatePublished(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="content"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {post ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
