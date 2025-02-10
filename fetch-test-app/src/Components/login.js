import React from "react";

function Login() {
  // Login function to authenticate user
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
      credentials: "include", // Ensure cookies are included in the request
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Return the response text
      })
      .then((data) => {
        // set the name and email in local storage for logout function later
        localStorage.setItem("name", $name);
        localStorage.setItem("email", $email);
        console.log("Success:", data);
        window.location.href = "/"; // Redirect to Home Page Route

      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  //Login button: Calls the login function
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");
    login(
      document.getElementById("name").value,
      document.getElementById("email").value
    );
  }

  return (
    <div className="site-container">
      <div className="login-container">
        <h1>Welcome to the Fetch Adoption Assistant!</h1>
        <h3>Here you can browse through hundreds of cuddly pubs eligible for Adoption.<br/>
        Enter your name and email address below to get started</h3>
        <input id="name" type="text" placeholder="Name" />
        <input id="email" type="text" placeholder="Email" />
        <button className="login-button" type="button" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
