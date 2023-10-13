import React, { useState } from "react";
import { Button, TextField, Box, Select, MenuItem } from "@mui/material";
import "./EditModal.css";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const EditModal = ({ editCard, onCloseModal, onSave }) => {
  const [name, setname] = useState(editCard.name || "");
  const [image, setImage] = useState(editCard.imageSrc || "");
  const [status, setStatus] = useState(editCard.status || "");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImage(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEditSave = () => {
    const editedCardData = {
      ...editCard,
      name: name,
      imageSrc: image,
      status: status,
    };

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

        {image && (
          <div>
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        )}
        <Button
          className="image-upload"
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onChange={(e) => setImage(e.target.value)}
          required
        >
          Upload image
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </Button>

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
            type="button"
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
