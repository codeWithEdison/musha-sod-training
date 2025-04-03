import React from "react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Server-side function to fetch posts
const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: Post[] = await response.json();
  return posts; // Return the array of posts directly
};

const Posts = async () => {
  const posts = await getPosts(); // Fetch posts within the component

  return (
    <div>
      <h1>POSTS</h1>
      <ul>
        {posts.slice(0, 10).map((post) => {
          return (
            <li
              key={post.id}
              className="bg-gray-50 p-4 m-4 shadow-md rounded-lg"
            >
              <h2 className="text-md font-bold text-black">{post.title}</h2>
              <p className="text-sm font-bold text-black">{post.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
