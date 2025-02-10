import React, { useState, useEffect } from "react";

function Dog(props) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [zip, setZip] = useState("");
  const [breed, setBreed] = useState("");

  function getDog() {
    console.log("dog Id: ", props.id);
    const url = "https://frontend-take-home-service.fetch.com/dogs";
    const data = [props.id];
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
        setImage(data[0].img);
        setName(data[0].name);
        setAge(data[0].age);
        setZip(data[0].zip_code);
        setBreed(data[0].breed);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  useEffect(() => {
    getDog();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "25vw" }}>
      <p>name: {name}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
            <p>age: {age}</p>
            <p>zip: {zip}</p>
            <p>breed: {breed}</p>
        </div>
        
        <img src={image} alt={name} style={{height: "10vw"}}/>
        
      </div>
    </div>
  );
}

export default Dog;
