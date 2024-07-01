// import express middleware
import express from "express";
// import cors middleware
import cors from "cors";
// import movie route
import movies from "./api/movies.route.js";
// create server
const app = express();
// attach cors and express middleware
// use function registers a middleware
app.use(cors());
// express.json is the parsing middleware
// to enable the server to read and accept
// JSON in a request's body

// it enables to retrieve data from request data
// via body attribute
// middleware: function that executes after
// the incoming request and before the output
app.use(express.json());

// initial route
// general convention for API
// /api/>version_number>
app.use("/api/v1/movies", movies);
// if someone tries to go to a route
// that doesn't exist, wildcard
// route * returns 404
app.use("*", (req, res) => {
  res.status(404).json({ error: "requested path not found" });
});
// export app as a module so other files can import it
// file that accesses the database
// file that starts the server
export default app;
