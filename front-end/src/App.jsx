import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [newCard, setNewCard] = useState({
    imageurl: "",
    name: "",
    price: "",
    description: "",
  });

  if (import.meta.hot) {
    import.meta.hot.accept(() => import.meta.hot.invalidate())
  } 

  useEffect(() => {
    

    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch("http://localhost:3500");
      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }
      const data = await response.json();
      setCards(data.rows);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  }

  const DeleteCard = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete card");
      }
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const updateCard = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3500/${editingCard.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingCard),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to update card");
      }
      fetchCards();
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  const addNewCard = async (e) => {
    e.preventDefault()
    try {
      console.log(newCard)
      const response = await fetch("http://localhost:3500/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to add new card");
      }
      setNewCard({
        imageurl: "",
        name: "",
        price: "",
        description: "",
      });
      fetchCards();
    } catch (error) {
      console.error("Error adding new card:", error);
    }
  };

  const openForm = (card) => {
    setEditingCard(card);
    setFormVisible(true);
  };
  const closeForm = () => {
    setFormVisible(false);
  };

  const handleChangeNewCard = (e) => {
    const { name, value } = e.target;
    setNewCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditCard = (e) => {
    const { name, value } = e.target;
    setEditingCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <button className="new" onClick={(e) => setFormVisible(true)}>
        add new one
      </button>
      <div className="cards">
        {formVisible && (
          <form className="form">
            <input
              type="text"
              placeholder="Img-url"
              value={editingCard ? editingCard.imageurl : newCard.imageurl}
              onChange={editingCard ? handleEditCard : handleChangeNewCard}
              name="imageurl"
            />
            <input
              type="text"
              placeholder="Name"
              value={editingCard ? editingCard.name : newCard.name}
              onChange={editingCard ? handleEditCard : handleChangeNewCard}
              name="name"
            />
            <input
              type="text"
              placeholder="Price"
              value={editingCard ? editingCard.price : newCard.price}
              onChange={editingCard ? handleEditCard : handleChangeNewCard}
              name="price"
            />
            <input
              type="text"
              placeholder="Description"
              value={
                editingCard ? editingCard.description : newCard.description
              }
              onChange={editingCard ? handleEditCard : handleChangeNewCard}
              name="description"
            />
            <button
              className="form-button"
              type="submit"
              onClick={(e) => editingCard ? updateCard(e) : addNewCard(e)}
            >
              {editingCard ? "edit" : "add"}
            </button>
          </form>
        )}
        {cards.map((card, index) => (
          <div key={index} className="card">
            <img src={card.imageurl} className="card-img" alt="card-img"></img>
            <div className="card-body">
              <div className="title-price">
                <h5 className="card-title">{card.name}</h5>
                <h5 className="price">{card.price}$</h5>
              </div>
              <p className="card-text">{card.description}</p>
            </div>
            <div className="buttons">
              <button className="delete" onClick={() => DeleteCard(cards[index].id)}>
                delete
              </button>
              <button className="edit" onClick={() => openForm(cards[index])}>
                edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
