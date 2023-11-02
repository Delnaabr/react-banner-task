import { AppBar, Button, Modal, Toolbar, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.css";
import { useState } from "react";
import Signin from "../signin/signin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";

const Header = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const signInVisible = useSelector((state) => state.ui.signinVisible);
  const signOutVisible = useSelector((state) => state.ui.signOutVisisble);
  const adminLogged = useSelector((state) => state.ui.adminLogged);

  const dispatch = useDispatch();
  const onSignInOpen = () => {
    setOpenSignIn(true);
  };
  const onSignInClose = () => {
    setOpenSignIn(false);
  };
  const onSignOut = () => {
    toast("Admin signed out successfully", {
      hideProgressBar: true,
      autoClose: 1000,
      type: "success",
      position: "top-center",
    });
    dispatch(uiActions.signOutShow());
    dispatch(uiActions.signInShow());
    adminLogged && dispatch(uiActions.adminLog());
  };
  return (
    <AppBar position="static" className="header-component">
      <Toolbar>
        <MenuIcon className="typo-class" />
        <Typography variant="h6" component="div" className="typo-class">
          Banner - ads
        </Typography>
        <div className="spacer" />

        {signInVisible ? (
          <Button variant="inherit" onClick={onSignInOpen}>
            Sign in
          </Button>
        ) : signOutVisible ? (
          <Button variant="inherit" onClick={onSignOut}>
            Sign out
          </Button>
        ) : (
          ""
        )}
      </Toolbar>
      <Modal open={openSignIn} onClose={onSignInClose} id="signinModal">
        <Box sx={{ width: 400, m: "auto", p: 2 }}>
          <Signin onClose={onSignInClose} />
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Header;
