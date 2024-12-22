import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <AppBar position="static" color="primary">
    <Toolbar>
      {/* Logo or Brand Name */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
       Contact Manager
      </Typography>

      {/* Navigation Links */}
      <Box>
        <Button color="inherit">
            <Link to={'/'} style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </Button>
        
        <Button color="inherit">
            <Link to={'/show-contact'} style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
        </Button>

        <Button color="inherit">
            <Link to={'/admin-contact'} style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
        </Button>
      </Box>

      
      {/* Right Section  another way to route pages*/}
      {/* <Box>
            <Button onClick={() => navigate("/")} color="inherit">Home</Button>
            <Button onClick={() => navigate("/show-contact")} color="inherit">Contacts</Button>
            <Button onClick={() => navigate("/admin-contact")} color="inherit">Admin</Button>
       </Box> */}
    </Toolbar>
  </AppBar>
  )
}

export default Navbar
