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
import throttle from "lodash.throttle";
import {
  fetchCards,
  updateCard,
  deleteCard,
  updateCardPositionsInJSON,
  fetchCardPosition,
} from "./api";
import CardListing from "./cardListing";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";

const DraggableCard = ({
  card,
  index,
  onEditClick,
  onRemoveClick,
  moveCard,
}) => {
  const throttledMoveCard = throttle(moveCard, 200);
  const adminLogged = useSelector((state) => state.ui.adminLogged);

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
        status={adminLogged ? card.status : null}
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
  const [allCards, setAllCards] = useState([]);
  const [activeCards, setActiveCards] = useState([]);
  const adminLogged = useSelector((state) => state.ui.adminLogged);

  useEffect(() => {
    fetchCards()
      .then((data) => {
        fetchCardPosition().then((pos) => {
          console.log(pos);
          console.log(data);
          var dataOrdered = [];
          for (let i = 0; i < pos.map.length; i++) {
            const element = pos.map[i];
            dataOrdered.push(data.filter((f) => f.id === element.id)[0]);
          }
          console.log(dataOrdered);
          setAllCards(dataOrdered);
          setActiveCards(
            dataOrdered.filter((card) => card.status === "active")
          );
        });
      })
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
    const reorderedCards = [...allCards];
    const [movedCard] = reorderedCards.splice(fromIndex, 1);
    reorderedCards.splice(toIndex, 0, movedCard);
    setAllCards(reorderedCards);
    setActiveCards(reorderedCards.filter((card) => card.status === "active"));
    updateCardPositionsInJSON([...reorderedCards]);
    console.log("oree", reorderedCards);
  };

  const handleEditSave = (editedCardData) => {
    updateCard(editedCardData)
      .then((updatedCard) => {
        const updatedCards = allCards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        );
        setAllCards(updatedCards);
        setActiveCards(updatedCards.filter((card) => card.status === "active"));
        handleCloseEdit();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleRemoveCard = (id) => {
    if (id) {
      deleteCard(id)
        .then(() => {
          const updatedCards = allCards.filter((card) => card.id !== id);
          setAllCards(updatedCards);
          setActiveCards(
            updatedCards.filter((card) => card.status === "active")
          );
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
            {adminLogged
              ? allCards.map((card, index) => (
                  <DraggableCard
                    key={card.id}
                    card={card}
                    index={index}
                    onEditClick={() => handleEditClick(card.id)}
                    onRemoveClick={() => handleRemoveClick(card.id)}
                    moveCard={moveCard}
                  />
                ))
              : activeCards.map((card, index) => (
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
              editCard={allCards.find((card) => card.id === editId)}
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
