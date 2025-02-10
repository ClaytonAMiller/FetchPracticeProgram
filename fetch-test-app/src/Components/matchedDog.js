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
    <div
      className="matched-dog-modal"
      style={{
        display: props.view,
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        position: "fixed",
        zIndex: "1000",
        top: "0",
        left: "0",
      }}
    >
      <div
        className="dog-container"
        style={{ display: "flex", flexDirection: "column", width: "25vw", backgroundColor: "white" }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          x
        </button>
        <p>name: {name}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p>age: {age}</p>
            <p>zip: {zip}</p>
            <p>breed: {breed}</p>
          </div>

          <img src={image} alt={name} style={{ height: "10vw" }} />
        </div>
      </div>
    </div>
  );
}

export default MatchedDog;
