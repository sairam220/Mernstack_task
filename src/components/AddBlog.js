import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
 

const AddBlog = () => {
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({
        title:'',
        description:'',
        image:''
       })

       const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,[e.target.name]:e.target.value
          }))
       }

       const sendRequest=async()=>{
        const response=await axios.post('http://localhost:5000/api/blog/add',{
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:localStorage.getItem('userId')
        }).catch(err=>console.log(err))
        const data=await response.data
        return data
       }

       const handleSumbit=(e)=>{
        e.preventDefault()
       
       setInputs({title:'',
       description:'',
       image:''})

       sendRequest().then(data=>console.log(data)).then(()=>navigate('/blogs'))

       }




  return (
    <div>
        <form onSubmit={handleSumbit}>
            <Box border={3} borderColor='radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)' borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={3} margin='auto' display='flex' flexDirection='column' width={'60%'} mb={3} mt={3}>
                <Typography fontWeight='bold' padding={3} color='gray' variant='h4' textAlign='center'>
                    Post Your Blog
                </Typography>
                <InputLabel  sx={{mb:1,mt:2,fontSize:'20px',fontWeight:'bold'}}>Title</InputLabel>
                <TextField name='title' onChange={handleChange} value={inputs.title} width='50%' margin='normal' variant='outlined'/>
                <InputLabel  sx={{mb:1,mt:2,fontSize:'20px',fontWeight:'bold'}}>Description</InputLabel>
                <TextField  name='description' margin='normal' onChange={handleChange} value={inputs.description} variant='outlined'/>
                <InputLabel sx={{mb:1,mt:2,fontSize:'20px',fontWeight:'bold'}}>Image URL</InputLabel>
                <TextField name='image' onChange={handleChange} value={inputs.image} margin='normal' variant='outlined'/>
                <Button type='submit' sx={{mt:2,borderRadius:4}} variant='contained' color='warning' >Save</Button>
            </Box>
        </form>
    </div>
  )
}

export default AddBlog