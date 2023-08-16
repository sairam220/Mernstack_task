import React from 'react'
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography,Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({title,description,image,user,isUser,id}) => {
    const navigate=useNavigate();

    const handleEdit=(e)=>{
        navigate(`/myBlogs/${id}`)
    }

    const deleteRequest=async()=>{
        const response=await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))

        const data = await response.data

        return data
    }

    const handleDelete=(e)=>{
        deleteRequest().then(()=>navigate('/')).then(()=>navigate('/blogs'))
    }

    console.log(user)
  return (
    <div>
        <Card sx={{ width: "40%" ,margin:'auto',mt:2,padding:2,boxShadow:'5px 5px 10px #ccc',":hover:":{
            boxShadow:'10px 10px 20px #ccc'
        }}}>
            {isUser&&(
                <Box display='flex'>
                    <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}} color='warning'><EditIcon/></IconButton>
                    <IconButton onClick={handleDelete} color='error'><DeleteForeverIcon/></IconButton>
                </Box>
            )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            
          </Avatar>
        }
       
        title={title}
        
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      
      <CardContent>
      <hr/>
      <br/>
        <Typography variant="body2" color="text.secondary">
          <b>{user}</b> {": "} {description}
        </Typography>
      </CardContent>
      
     
    </Card>
 
    </div>
  )
}


export default Blog