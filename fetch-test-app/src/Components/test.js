
import { useState } from "react";
import Dogs from "./dogs";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  function login($name, $email) {
    const url = "https://frontend-take-home-service.fetch.com/auth/login";
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
        localStorage.setItem("name", $name);
        localStorage.setItem("email", $email);
        return response.text();
      })
      .then((data) => {
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function handleLogin(event) {
    event.preventDefault();
    console.log("Form submitted");
    login(
      document.getElementById("name").value,
      document.getElementById("email").value
    );
  }

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
        setLoggedIn(false);
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

  

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Home</h1>
            <Dogs isloggedIn={loggedIn}/>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <input id="name" type="text" placeholder="Name" />
          <input id="email" type="text" placeholder="Email" />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;