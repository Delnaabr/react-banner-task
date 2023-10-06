import { Box, Button, TextField } from "@mui/material";
import React from "react";
import "../signin/signin.css";

const Signin = () => {
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
  const onSignInHandler = () => {
    alert("Admin signed in successfully");
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
          // value={title}
          label="Email"
          required
          fullWidth
        />
        <TextField
          className="textfield"
          id="standard-full-width"
          placeholder="Password"
          name="email"
          // value={title}
          label="Password"
          // onChange={handleTitle}
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
