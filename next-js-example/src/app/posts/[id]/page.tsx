"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }


const Post = () => {
    const {id} = useParams();
     const [post, setPost] = useState<Post | null>(null);
     const [error, setError] = useState<string | null>(null);
     const [loading, setloading] = useState(true);

     useEffect(() => {

        if(!id) return ;

     
            const fetchPost = async () =>{
try{
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data:Post = await response.json();
    setPost(data);
}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catch(error){
                setError('Failed to fetch post');
            }
            finally{
                setloading(false)
            }
        
     }
        fetchPost()
        
    }, [id])

  return (
<div>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    {post && (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )}
 </div>
  )
}

export default Post