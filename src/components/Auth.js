import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate=useNavigate()


  const dipath=useDispatch()
   const [inputs,setInputs]=useState({
    name:'',
    email:'',
    password:''
   })
   const [isSignUp,setSignUp]=useState(false)


    const handleChange=(e)=>{
        setInputs((prevState)=>({
          ...prevState,[e.target.name]:e.target.value
        }))
    }

    const sendRequest=async(type="login")=>{
      const response=await axios.post(`http://localhost:5000/api/user/${type}`,{
        name:inputs.name,
        email:inputs.email,
        password:inputs.password
      }).catch(err=>console.log(err))
       console.log(response)
      
      if (await response.status===200){
        const data=await response.data
        console.log(data)
        return data
      }
      

    }

    const handleSubmit=(e)=>{
      e.preventDefault()
     if (isSignUp){
      sendRequest("signUp").then((data)=>localStorage.setItem('userId',data.user._id)).then(()=>dipath(authActions.login())).then(()=>navigate('/blogs')).then(data=>console.log(data))
     }else{
      sendRequest().then((data)=>localStorage.setItem('userId',data.user._id)).then(()=>dipath(authActions.login())).then(()=>navigate('/blogs')).then(data=>console.log(data))
     }
      
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' boxShadow='10px 10px 20px #ccc' padding={3} margin='auto' marginTop={5} borderRadius={5} maxWidth={400}
      > 
          <Typography padding={3} textAlign='center' variant='h5'>{!isSignUp?'Login':'Signup'}</Typography>
            {isSignUp&&<TextField type={'text'} name='name' onChange={handleChange} margin='normal' value={inputs.name} placeholder='name'/>
            }<TextField onChange={handleChange} name='email' type='email' margin='normal' value={inputs.email} placeholder='email'/>
            <TextField onChange={handleChange} name='password' type='password'  margin='normal' value={inputs.password} placeholder='password'/>
            <Button variant='contained' color='warning' sx={{borderRadius:3,marginTop:3}} type='submit'>Submit</Button>
            <Button   sx={{borderRadius:3,marginTop:3}} onClick={()=>setSignUp(!isSignUp)}>Change To {isSignUp?'Login':'Signup'}</Button>
         
        </Box>
      </form>
    </div>
  )
}

export default Auth