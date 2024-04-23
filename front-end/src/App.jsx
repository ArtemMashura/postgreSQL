import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch("http://localhost:3500");
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        console.log(data.rows);
        setCards(data.rows);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }

    fetchCards();
  }, []);

  const DeleteCard = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete card");
      }
      this.fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="container">
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
          <button className="delete" onClick={() => DeleteCard(card.id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
