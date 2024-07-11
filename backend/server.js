import express from "express";
import cors from "cors";
import movies from "./api/movies.route.js";

const app = express();

// Allow requests from your frontend domain
const corsOptions = {
  origin: ["*"],
  credentials:true // Some legacy browsers (e.g., IE11) may not understand 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1/movies", movies);

// Catch-all route for 404 errors
app.use("*", (req, res) => {
  console.log("Requested Path:", req.path);
  res.status(404).json({ error: "Requested path not found" });
});

export default app;
