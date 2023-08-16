import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Blog from './Blog'

const UserBlogs = () => {
    const [blogItem,setBlogItem]=useState()
    const id=localStorage.getItem('userId')

    useEffect(()=>{
        const sendRequest=async()=>{
            const response=await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch(err=>console.log(err))
            const data=await response.data
            return data
        }

        sendRequest().then(data=>setBlogItem(data.user))
    },[])

   console.log(blogItem)

  return (
    <div>
         {blogItem&& blogItem.blogs&& blogItem.blogs.map((blog,index)=>(
            <Blog id={blog._id} isUser={true} key={index} title={blog.title} description={blog.description} image={blog.image} user={blogItem.name}/>
        ))}
    </div>
  )
}

export default UserBlogs