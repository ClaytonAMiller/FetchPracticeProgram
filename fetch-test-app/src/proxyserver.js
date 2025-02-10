const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend's origin
    credentials: true // Allow credentials (cookies) to be sent
}));

app.options('*', cors()); // Enable pre-flight requests for all routes

app.post('/proxy/auth/login', (req, res) => {
    const url = "https://frontend-take-home-service.fetch.com/auth/login";
    const options = {
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
        withCredentials: true
    };

    request(options, (error, response, body) => {
        if (error) {
            return res.status(500).send(error);
        }

        // Forward the cookies from the API response to the client
        const cookies = response.headers['set-cookie'];
        if (cookies) {
            res.setHeader('Set-Cookie', cookies);
        }

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        res.status(response.statusCode).send(body);
    });
});

app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});