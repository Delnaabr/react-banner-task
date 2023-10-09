import { BASE_URL } from "../../utils/db";

export const fetchCards = () => {
  return fetch(`${BASE_URL}/cardsData`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

export const updateCard = (editedCardData) => {
  return fetch(`${BASE_URL}/cardsData/${editedCardData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedCardData),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error updating data:", error);
      throw error;
    });
};

export const deleteCard = (id) => {
  return fetch(`${BASE_URL}/cardsData/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
      throw error;
    });
};
