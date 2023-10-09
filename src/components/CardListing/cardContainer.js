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
import { useState, useEffect } from "react";
import DeleteModal from "../Modals/DeleteModal";
import EditModal from "../Modals/EditModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchCards, updateCard, deleteCard } from "./api";

const CardContainer = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [cards, setCards] = useState([]); // Initialize cards as an empty array

  useEffect(() => {
    fetchCards()
      .then((data) => setCards(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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

  const handleRemoveClick = (id) => {
    console.log("Remove");
    if (id) {
      setEditId(id);
      setOpenDelete(true);
    }
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedCards = [...cards];
    const [movedCard] = reorderedCards.splice(result.source.index, 1);
    reorderedCards.splice(result.destination.index, 0, movedCard);
    setCards(reorderedCards);
  };

  const handleEditSave = (editedCardData) => {
    updateCard(editedCardData)
      .then((updatedCard) => {
        const updatedCards = cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        );
        setCards(updatedCards);
        handleCloseEdit();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleRemoveCard = (id) => {
    console.log("id", id);
    if (id) {
      deleteCard(id)
        .then(() => {
          const updatedCards = cards.filter((card) => card.id !== id);
          setCards(updatedCards);
          handleCloseDelete();
        })
        .catch((error) => {
          console.error("Error deleting card:", error);
        });
    }
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
              {cards.map((card, index) => (
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
          editCard={cards.find((card) => card.id === editId)}
          onSave={handleEditSave}
        />
      </Modal>
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <DeleteModal
          onCloseModal={handleCloseDelete}
          onSave={() => handleRemoveCard(editId)}
        />
      </Modal>
    </Box>
  );
};

export default CardContainer;
