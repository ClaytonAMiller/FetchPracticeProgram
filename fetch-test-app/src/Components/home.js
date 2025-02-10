import Dogs from "./dogs";
import React from "react";
import { Helmet } from "react-helmet";

function Home() {
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

  return (
    <div className="site-container">
      <Helmet>
        <title>Fetch: Find Your Next Best Friend</title>
        <meta
          name="description"
          content="Find your next best friend with Fetch. Explore a variety of dog breeds, ages, and more to find the perfect companion for you."
        />
      </Helmet>
      <button className="logout-button" type="button" onClick={handleLogout}>
        Logout
      </button>
      <Dogs  />
      
    </div>
  );
}

export default Home;
