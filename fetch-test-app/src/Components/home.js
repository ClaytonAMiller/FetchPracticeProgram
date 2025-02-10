import { useState } from "react";
import Dogs from "./dogs";
import React from "react";

function Home() {
  const [breeds, setBreeds] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);


  function getDogBreeds() {
    const url = "https://frontend-take-home-service.fetch.com/dogs/breeds";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
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
            setBreeds(data);
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
  }

  // getDogBreeds();
  

  function logout($name, $email) {
    const url = "https://frontend-take-home-service.fetch.com/auth/logout";
    const data = {
      name: $name,
      email: $email,
    };
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
        response.text();
      })
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "/"; // Redirect to another route
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function handleLogout(event) {
    event.preventDefault();
    console.log("Form submitted");
    logout(
      localStorage.getItem("name").value,
      localStorage.getItem("email").value
    );
  }

  // if (loggedIn) {
  //   console.log("Logged in");
  // } else {
  //   console.log("Logged out");
  //   window.location.href = "/login";
  // }

  return (
    <div>
      <h1>Home</h1>
      <Dogs  />
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
