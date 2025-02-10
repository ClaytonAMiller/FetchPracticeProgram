

function Login() {
    function login($name, $email) {
        const url = "https://frontend-take-home-service.fetch.com/auth/login"; // Use the proxy endpoint
        const data = {
            name: $name,
            email: $email
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include" // Ensure cookies are included in the request
        };
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text(); // Return the response text
            })
            .then(data => {
                console.log("Success:", data);
                window.location.href = "/"; // Redirect to another route
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Form submitted");
        login(document.getElementById("name").value, document.getElementById("email").value);
    }
    
    return (
        <div>
            <input id="name" type="text" placeholder="Name" />
            <input id="email" type="text" placeholder="Email" />
            <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Login;