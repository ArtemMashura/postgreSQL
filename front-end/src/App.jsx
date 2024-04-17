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

  return (
    <div>
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="card-body">
            <h5 className="card-title">{card.name}</h5>
            <p className="card-text">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
