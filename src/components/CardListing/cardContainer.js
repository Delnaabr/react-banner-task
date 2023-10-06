import CardListing from "./cardListing";
import "./cardList.css";
import {
  Select,
  MenuItem,
  Button,
  InputLabel,
  Box,
} from "@mui/material";
import { useState } from "react";
import { cardsData } from "../../utils/db";

const CardContainer = () => {
 
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  

  const handleEditClick = () => {
    console.log("edit");
  };

  const handleRemoveClick = () => {
    console.log("Remove");
  };

  return (
    <Box className="main-container">
      <Box className="card-container">
        {cardsData.map((card) => (
          <Box key={card.id} className="card-list">
            <CardListing
              imageSrc={card.imageSrc}
              name={card.name}
              status={card.status}
              onEditClick={() => handleEditClick(card.id)}
              onRemoveClick={() => handleRemoveClick(card.id)}
            />
          </Box>
        ))}
      </Box>
      <Box>
        <InputLabel className="add-heading">Add</InputLabel>
        <Box className="dropdown-button-container">
          <Select
            value={selectedValue}
            onChange={(event) => handleChange(event)}
            className="dropdown"
            fullWidth
            variant="filled"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="option1">First</MenuItem>
          </Select>
          <Button variant="contained" color="primary" className="button">
            UPDATE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardContainer;
