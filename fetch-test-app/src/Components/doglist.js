import React, { useState, useEffect, useCallback } from "react";
import "../Styles/styles.css";

const DogList = React.memo(({ dogIds, handleFavoriteClick, favorites }) => {
  const [dogs, setDogs] = useState([]); // List of dog objects

  // Function to fetch dog data from the API
  const getDogs = useCallback(() => {
    // console.log("Fetching dog data for IDs: ", dogIds); // Debugging line
    const url = "https://frontend-take-home-service.fetch.com/dogs";
    const data = dogIds; // Assuming dogIds is an array of dog IDs
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setDogs(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [dogIds]);

  useEffect(() => {
    getDogs();
  }, [getDogs]);

  return (
    <div className="dog-list-container">
      {dogs.map((dog, index) => (
        <div key={index} className={`dog-container ${favorites.includes(dog.id) ? 'favorite' : ''}`}>
          
          <h2>NAME: {dog.name}</h2>
          <div className="dog-details">
            <div>
              <p>Age: {dog.age}</p>
              <p>Zip: {dog.zip_code}</p>
              <p>Breed: {dog.breed}</p>
            </div>
            {dog.img && <img src={dog.img} alt={dog.name} className="dog-img" />}
          </div>
          <button className="favorite-button" onClick={() => handleFavoriteClick(dog.id)}>Favorite</button>
        </div>
      ))}
    </div>
  );
});

export default DogList;