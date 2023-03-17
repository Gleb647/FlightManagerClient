import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tabs from '../Tabs/Tabs';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ButtonAppBar(props) {

  const [loggedInButton, setLoggedInButton] = useState({...props.loggedIn});

  useEffect(() =>{
    setLoggedInButton(props.loggedIn);
  }, [props.loggedIn])

  const logOut = () =>{
    props.changeLoggedInState(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("exp");
    localStorage.removeItem("refresh_token");
    localStorage.setItem("roles", '');
    localStorage.setItem("user", '');
  }

  const logInBtns = () =>{
    return(
      <>
        <Link to="/login"><Button color="inherit">Log in</Button></Link>
        <Link to="/signup"><Button color="inherit">Register</Button></Link>
      </>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ width: '140px' }}>
            FlightTickets
          </Typography>
          <Tabs/>
          <div className='fx-grow'></div>
          {loggedInButton === true ? <Button color="inherit" onClick={() => {logOut()}}>Log out</Button> : logInBtns()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}