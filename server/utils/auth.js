// library used to create and verify json web tokens
const jwt = require("jsonwebtoken");
require('dotenv').config();

// used to sign and verify the tokens
const secret = process.env.JWT_SECRET;
// specifies how long the token is valid
const expiration = process.env.JWT_EXP;

module.exports = {
    authMiddleware: function({ req }) {
        // this attemps to retrieve the token from the request body, query parameters, or the `authorization` headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        //if in authorization header it assumes the token is bearer token, splits the header value and takes the last part which is the actual token
        if(req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }

        // if no token the function returns the request object unmodified 
        if(!token) {
            return req;
        }

        // verifying the token the secret and expiration, if the token is valid, the user is extracted and attaches to the req object as req user || if token is invalid and error is caught and `invalid token` is logged in the console
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("Invalid token");
        }
        // function returns the modified request object
        return req;
    },

    signToken: function({ email, username, _id }) {
        // creates payload object containing the users email, username, and id. this data will be encoded into the token 
        const payload = { email, username, _id };
        // this signs payload with secret and expiration time, the resulting token is returned 
        return jwt.sign({ data: payload }, secret, {expiresIn: expiration })
    },
};