const jwt = require("jsonwebtoken");
require('dotenv').config();

const apiKey = process.env.ABLY_API_KEY;
const [ keyId, keySecret ] = apiKey.split(":");

const expiresIn = 3600;
const jwtOptions = { expiresIn, keyId };

const express = require('express');
const app = express();

app.use('/', express.static(__dirname));

app.get("/auth", (req, res) => {
    console.log("Successfully connected to the server auth endpoint");
  
    const randomId = Math.random().toString(16).slice(-8);
    const clientId = req.query.clientId || randomId;
  
    const jwtPayload = {
      "x-ably-capability": capability,
      "x-ably-clientId": clientId,
    };
  
    jwt.sign(jwtPayload, keySecret, jwtOptions, (err, tokenId) => {
      console.log("JSON Web Token signed by auth server");
  
      if (err) return console.trace();
  
      res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.setHeader("Content-Type", "application/json");
  
      console.log("Sending signed JWT token back to client", tokenId);
      res.send(JSON.stringify(tokenId));
    });
  });

  app.listen(3000, function () {
    console.log('Web server listening on port', 3000);
});