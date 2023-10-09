import { Box, Divider, Typography, Button } from "@mui/material";
import "./DeleteModal.css";
import React from "react";
import { toast } from "react-toastify";

const DeleteModal = (props) => {
  const handleCloseModal = () => {
    props.onCloseModal();
  };
  const handleDelete = () => {
    if (props.onSave) {
      props.onSave();
    }
    props.onCloseModal();
    toast("Card deleted successfully", {
      hideProgressBar: true,
      autoClose: 1000,
      type: "success",
      position: "top-center",
    });
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
        <Button className="delete-button" onClick={handleDelete}>
          Delete
        </Button>

        <Button className="cancel-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default DeleteModal;
