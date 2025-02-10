import React, { useState, useEffect } from "react";

function MatchedDog(props) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [zip, setZip] = useState("");
  const [breed, setBreed] = useState("");

  function getDog() {
    const matchedDog = props.id;
    console.log("dog Id: ", props.id);
    console.log("dog Id type: ", typeof(props.id));
    console.log("props.id keys: ", Object.keys(props.id));
    console.log(matchedDog.match)
    const url = "https://frontend-take-home-service.fetch.com/dogs";
    const data = [matchedDog.match];
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
    if(props.id != null){
        getDog();
    }
    
  }, [props.id]);

  function handleClose() {
    props.setView("none");
    document.body.style.overflow = 'auto';
  }

  return (
    <div className="matched-dog-modal" style={{ display: props.view }}>
      <div className="dog-container matched-dog">
        <button className="close-button" onClick={handleClose}>
          x
        </button>
        <h2>NAME: {name}</h2>
        <div className="dog-details">
          <div>
            <p>Age: {age}</p>
            <p>Zip: {zip}</p>
            <p>Breed: {breed}</p>
          </div>
          <img src={image} alt={name} className="dog-img" />
        </div>
      </div>
    </div>
  );
}

export default MatchedDog;
