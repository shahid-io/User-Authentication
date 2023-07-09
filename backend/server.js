import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user-routes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json("Up");
});
app.listen(PORT, () => {
  console.log(`server is up : http://localhost:${PORT}`);
});
