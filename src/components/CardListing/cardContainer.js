import CardListing from "./cardListing";
import "./cardList.css";
import {
  Select,
  MenuItem,
  Button,
  InputLabel,
  Box,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { cardsData } from "../../utils/db";
import DeleteModal from "../Modals/DeleteModal";
import EditModal from "../Modals/EditModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CardContainer = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editId, setEditId] = useState(null);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleEditClick = (id) => {
    console.log("edit");
    setOpenEdit(true);
    setEditId(id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleRemoveClick = () => {
    console.log("Remove");
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [cards, setCards] = useState(cardsData);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedCards = [...cards];

    const [movedCard] = reorderedCards.splice(result.source.index, 1);
    reorderedCards.splice(result.destination.index, 0, movedCard);
    setCards(reorderedCards);
  };

  return (
    <Box className="main-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="card-list">
          {(provided) => (
            <Box
              className="card-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cardsData.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <Box
                      className="card-list"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CardListing
                        imageSrc={card.imageSrc}
                        name={card.name}
                        status={card.status}
                        onEditClick={() => handleEditClick(card.id)}
                        onRemoveClick={() => handleRemoveClick(card.id)}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
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
      </DragDropContext>

      <Modal open={openEdit} onClose={handleCloseEdit}>
        <EditModal
          onCloseModal={handleCloseEdit}
          id={editId}
          editCard={cardsData.find((card) => card.id === editId)}
        />
      </Modal>
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <DeleteModal onCloseModal={handleCloseDelete} />
      </Modal>
    </Box>
  );
};

export default CardContainer;
