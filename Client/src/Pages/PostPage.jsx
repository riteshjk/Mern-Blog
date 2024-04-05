import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {CallToAction} from '../components/CallToAction';

const PostPage = () => {
    const {postSlug} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () =>{
            try{
                setLoading(true);
                setError(false);
                const res= await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if(!res.ok){
                    setError(true);
                    setLoading(false);
                }
                else{
                    setPost(data);
                    setLoading(false);
                }

            }
            catch(error){   
                console.log(error);
                setError(true);
            }   
        };
        fetchPost()
    },[postSlug])


    if(loading){
        return (
            
                <div className='flex justify-center items-center min-h-screen'>
                   <Spinner size={"xl"}/> 
                </div>
        )
    }

    console.log(post,"data")
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.posts[0].title}</h1>
      <Link className='self-center mt-5' to={`/search?category=${post && post.posts[0].category}`}>
      <Button color={"gray"} pill size="xs">{post && post.posts[0].category}</Button>
      </Link>
      <img className='self-center mt-10 p-3 max-h-[600px] w-full object-cover' src={post && post.posts[0].image} alt={post && post.posts[0].title} />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.posts[0].createdAt).toDateString()}</span>
        <span className='italic'>{post && (post.posts[0].content.length/1000).toFixed(0)} mins read</span>
      </div>
      <div dangerouslySetInnerHTML={{__html:post && post.posts[0].content}} className='p-3 max-w-6xl mx-auto lg:text-lg' style={{fontFamily:"serif"}}>
        
      </div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction/>
      </div>
    </main>
  )
}

export default PostPage
