import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  InputLabel,
  Modal,
} from "@mui/material";
import { useSelector } from "react-redux";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { fetchCards, updateCard, deleteCard } from "./api";
import CardListing from "./cardListing";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";
import throttle from 'lodash.throttle';

const DraggableCard = ({
  card,
  index,
  onEditClick,
  onRemoveClick,
  moveCard,
}) => {
  // Throttle the moveCard function
  const throttledMoveCard = throttle(moveCard, 200);

  const [, ref] = useDrag({
    type: "CARD",
    item: { id: card.id, index },
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        throttledMoveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{ display: "inline-flex", margin: "10px" }}
    >
      <CardListing
        imageSrc={card.imageSrc}
        name={card.name}
        onEditClick={onEditClick}
        onRemoveClick={onRemoveClick}
      />
    </div>
  );
};


const CardContainer = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [cards, setCards] = useState([]);
  const adminLogged = useSelector((state) => state.ui.adminLogged);

  useEffect(() => {
    fetchCards()
      .then((data) => setCards(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleEditClick = (id) => {
    setOpenEdit(true);
    setEditId(id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleRemoveClick = (id) => {
    if (id) {
      setEditId(id);
      setOpenDelete(true);
    }
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const moveCard = (fromIndex, toIndex) => {
    const reorderedCards = [...cards];
    const [movedCard] = reorderedCards.splice(fromIndex, 1);
    reorderedCards.splice(toIndex, 0, movedCard);
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
    <>
      <DndProvider backend={HTML5Backend}>
        <Box className="main-container">
          <div>
            {cards.map((card, index) => (
              <DraggableCard
                key={card.id}
                card={card}
                index={index}
                onEditClick={() => handleEditClick(card.id)}
                onRemoveClick={() => handleRemoveClick(card.id)}
                moveCard={moveCard}
              />
            ))}
          </div>
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
          {adminLogged && (
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
      )}
        </Box>
      </DndProvider>
    
    </>
  );
};

export default CardContainer;
