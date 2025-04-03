import React from "react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Server-side function to fetch a single post
const getPost = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
};

const PostDetails = async ({ params }: { params: { id: string } }) => {
  const post: Post = await getPost(params.id); // Fetch post based on dynamic ID

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Post Details</h1>
      <div className="bg-gray-50 p-4 m-4 shadow-md rounded-lg">
        <h2 className="text-md font-bold text-black">{post.title}</h2>
        <p className="text-sm font-bold text-black">{post.body}</p>
      </div>
    </div>
  );
};

export default PostDetails;
