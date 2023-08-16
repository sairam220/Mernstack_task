import React, { useState } from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../store';


const Header = () => {
    const dispath=useDispatch()
    const isLoggedIn= useSelector(state=>state.isLoggedIn);
    const [value,setValue]=useState(0);



  return (
    <AppBar position='sticky' sx={{background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'}}>
        <Toolbar>
            <Typography variant='h4' sx={{fontFamily:'sans-serif',cursor:'pointer'}} LinkComponent={Link} to='/blogs' >Blogs</Typography>
            {isLoggedIn&& <Box display='flex' marginLeft='auto' marginRight='auto'>
                <Tabs textColor='inheit'  value={value} onChange={(e,val)=>setValue(val)}>
                     <Tab LinkComponent={Link} to='/blogs' label='All Blogs'/>
                     <Tab LinkComponent={Link} to='/myBlogs' label='My Blogs'/>
                     <Tab LinkComponent={Link} to='/blogs/add' label='Add BLOG'/>
                </Tabs>
            </Box>}
            <Box display='flex' marginLeft='auto' >
                {!isLoggedIn&& <><Button LinkComponent={Link} to='/auth' variant='container' sx={{margin:1,borderRadius:10,background:'green',fontFamily:'sans-serif'}} color='warning'>Login</Button>
                <Button LinkComponent={Link} to='/auth' variant='container' sx={{margin:1,borderRadius:10,background:'red',fontFamily:'sans-serif'}} color='success'>Signup</Button>
                </>} {isLoggedIn&&<Button LinkComponent={Link} to='/auth' variant='container' sx={{margin:1,borderRadius:10,background:'green',fontFamily:'sans-serif'}} color='warning' 
                onClick={()=>dispath(authActions.logout())}>Logout</Button>
               } 
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header