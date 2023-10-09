import React, { useState } from "react";
import { Button, TextField, Box, Select, MenuItem } from "@mui/material";
import "./EditModal.css";
import { toast } from "react-toastify";

const EditModal = ({ editCard, onCloseModal, onSave }) => {
  const [name, setname] = useState(editCard.name || "");
  const [image, setImage] = useState(editCard.imageSrc || "");
  const [status, setStatus] = useState(editCard.status || "");

  const handleEditSave = () => {
    // Create an object with the edited data
    const editedCardData = {
      ...editCard,
      name: name,
      imageSrc: image,
      status: status,
    };

    // Call the onSave function to save the edited data
    onSave(editedCardData);
    toast("Card details updated successfully", {
      hideProgressBar: true,
      autoClose: 1000,
      type: "success",
      position: "top-center",
    });

  };

  const handleClose = () => {
    onCloseModal();
  };

  return (
    <Box className="modal-container">
      <form>
        <h3>Edit Details</h3>
        <TextField
          id="standard-full-width"
          placeholder="name"
          name="name"
          value={name}
          label="name"
          onChange={(e) => setname(e.target.value)}
          required
          fullWidth
        />

        <TextField
          id="standard-full-width"
          placeholder="Image"
          name="image"
          value={image}
          label="Image"
          onChange={(e) => setImage(e.target.value)}
          required
          fullWidth
        />

        <Select
          value={status}
          label="status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>

        <div className="button-container">
          <Button
            type="button" // Use "button" type to prevent form submission
            variant="outlined"
            color="primary"
            onClick={handleEditSave}
          >
            Update
          </Button>

          <Button variant="outlined" color="info" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EditModal;
