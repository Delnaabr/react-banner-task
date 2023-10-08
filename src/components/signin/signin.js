import { Box, Button, TextField } from "@mui/material";
import React from "react";
import "../signin/signin.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";

const Signin = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    color: "#333",
  };
  const signInVisible = useSelector((state) => state.ui.signinVisible);
  const adminLogged = useSelector((state) => state.ui.adminLogged);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSignInHandler = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin@123") {
      dispatch(uiActions.signInShow())
      dispatch(uiActions.signOutShow())
      if(!adminLogged){
        dispatch(uiActions.adminLog())
      }
      toast("Admin signed in successfully", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "success",
        position: "top-center",
      });
    } else {
      toast("Invalid credentials", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "error",
        position: "top-center",
      });
    }
    props.onClose();
  };

  return (
    <Box sx={style}>
      <form onSubmit={onSignInHandler}>
        <h3 className="heading">Sign In</h3>
        <TextField
          className="textfield"
          id="standard-full-width"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          required
          fullWidth
        />
        <TextField
          className="textfield"
          id="standard-full-width"
          placeholder="Password"
          name="password"
          value={password}
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <div className="but">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="btn-class"
          >
            Sign In
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default Signin;
