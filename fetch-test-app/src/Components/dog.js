import React, { useState, useEffect } from "react";

function Dog(props) {
  const [dogs, setDogs] = useState([]);

  function getDogs() {
    console.log("dog Ids: ", props.ids);
    const url = "https://frontend-take-home-service.fetch.com/dogs";
    const data = props.ids; // Assuming props.ids is an array of dog IDs
    console.log("data: ", data);
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
  }

  useEffect(() => {
    getDogs();
  }, [props.ids]);

  return (
    <div>
      {dogs.map((dog, index) => (
        <div key={index} className="dog-container" style={{ display: "flex", flexDirection: "column", width: "25vw" }}>
          <button style={{ position: "relative", top: "0", left: "21.75vw", width: "fit-content" }} onClick={() => props.onFavoriteClick(dog.id)}>Favorite</button>
          <p>name: {dog.name}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>age: {dog.age}</p>
              <p>zip: {dog.zip_code}</p>
              <p>breed: {dog.breed}</p>
            </div>
            {dog.img && <img src={dog.img} alt={dog.name} style={{ height: "10vw" }} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dog;