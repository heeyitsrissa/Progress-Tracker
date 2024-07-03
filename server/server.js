//importing dependancies
// webframwork for node.js
const express = require("express");
// core of apollo server,which helps create a graphql server
const { ApolloServer } = require("@apollo/server");
// middleware to integrate Apollo server with express
const { expressMiddleware } = require("@apollo/server/express4");
// node module to handle and transform file paths
const path = require("path");
// custom middleware for authentication
const { authMiddleware } = require("./utils/auth");
// middleware for handling Cross-Origin resource sharing
const cors = require("cors");
// middleware to parse incoming request bodies
const  bodyParser = require("body-parser");
// schema definitions and resolvers for GraphQl
const { typeDefs, resolvers } = require("./schemas");
// database connection configuration
const db = require("./config/connection");

// setting up port to enviroment variable PORT or defaults it to port 3001
const PORT = process.env.PORT || 3001;

// initializes an Express application
const app = express();

// initializes a new apollo server with the provided type defs and resolvers
const server = new ApolloServer({ 
    typeDefs,
    resolvers,
});

// adds CORS middleware to handle cross-origin requests 
app .use(cors());

// starts apollo server
const startApolloServer = async () => {
    await server.start();

    // adds middleware to parse URL-encoded data, JSON data, raw JSON bodies
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(bodyParser.json());

    // adds middleware ti handle graphqol at `/graphql` endpoint. it also sets up the context for each request using the authmiddleware
    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: ({ req }) => authMiddleware ({ req }),
        })
    );

    // serves static files from the `client/dist` directory if environment is set to `production` 
    if(process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/dist")));
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/index.html"))
        });
    }

    //listens for the database connection to open then starts the server on the specified port and logs the URL for the graphql endpoint 
    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/grapgql`);
        });
    });
};

// calls function to start apollo server
startApolloServer();