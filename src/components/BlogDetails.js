import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const BlogDetails = () => {
    const id=useParams().id;
    const [blog,setBlog]=useState()
    const navigate=useNavigate()

    const [inputs,setInputs]=useState({
    
    })
    
    const fetchedDetails=async()=>{
        const response=await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
        const data=await response.data
        return data
    }
    
   useEffect(()=>{
    fetchedDetails().then(data=>{
        setBlog(data)
        setInputs({
            title:data.blog.title,
            description:data.blog.description,
            image:data.blog.image

        })
    })
   },[id])

   

   const handleChange=(e)=>{
    setInputs((prevState)=>({
        ...prevState,[e.target.name]:e.target.value
      }))
   }

   const sendRequest=async()=>{
    const response=await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
        title:inputs.title,
        description:inputs.description,
    }).catch(err=>console.log(err))
    const data=await response.data
    return data
   }

   const handleSumbit=(e)=>{
    e.preventDefault()
   
   

   sendRequest().then(data=>console.log(data)).then(()=>navigate('/myBlogs'))

   }

   console.log(blog)


  return (
    <div>
       {inputs&& <form onSubmit={handleSumbit}>
            <Box border={3} borderColor='radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)' borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={3} margin='auto' display='flex' flexDirection='column' width={'60%'} mb={3} mt={3}>
                <Typography fontWeight='bold' padding={3} color='gray' variant='h4' textAlign='center'>
                    Post Your Blog
                </Typography>
                <InputLabel  sx={{mb:1,mt:2,fontSize:'20px',fontWeight:'bold'}}>Title</InputLabel>
                <TextField name='title' onChange={handleChange} value={inputs.title} width='50%' margin='normal' variant='outlined'/>
                <InputLabel  sx={{mb:1,mt:2,fontSize:'20px',fontWeight:'bold'}}>Description</InputLabel>
                <TextField  name='description' margin='normal' onChange={handleChange} value={inputs.description} variant='outlined'/>
                <Button type='submit' sx={{mt:2,borderRadius:4}} variant='contained' color='warning' >Update</Button>
            </Box>
        </form>}
    </div>
  )
}

export default BlogDetails