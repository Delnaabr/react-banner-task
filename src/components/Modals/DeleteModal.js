import { Box, Divider, Typography } from "@mui/material";
import "./DeleteModal.css";
import React from "react";

const DeleteModal = (props) => {
  const handleCloseModal = () => {
    props.onCloseModal();
  };
  const handleDelete = () => {
    props.onCloseModal();
  };
  return (
    <Box className="delete-modal">
      <Typography className="heading">Delete Confirmation</Typography>
      <Divider></Divider>
      <Typography id="modal-modal-description" className="message">
        Are you sure you want to delete?{" "}
      </Typography>
      <Divider className="divider" />
      <div className="button-container">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>

        <button className="cancel-button" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </Box>
  );
};

export default DeleteModal;
