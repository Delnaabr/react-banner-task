
import { AppBar, Button, Modal, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import "./header.css";
import { useState } from "react";
import Signin from "../signin/signin";


const Header = () => {
  const [openSignIn,setOpenSignIn]=useState(false)
  const onSignInOpen=()=>{
    setOpenSignIn(true)
  }
  const onSignInClose=()=>{
    setOpenSignIn(false)
  }
  return (
    <AppBar position="static" className="header-component">
      <Toolbar>
        <MenuIcon className="typo-class" />
        <Typography variant="h6" component="div" className="typo-class">
          SPC Dashboard | Banner-ads
        </Typography>
        <div className="spacer"/>
        <Button variant="inherit" onClick={onSignInOpen}>Sign in</Button>
      </Toolbar>
      <Modal open={openSignIn} onClose={onSignInClose}>
        <Signin/>
      </Modal>
    </AppBar>
  );
};

export default Header;