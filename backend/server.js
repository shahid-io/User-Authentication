import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/user-routes.js";
import { notFound, errorHandler } from "./middleware/error-middleware.js";
import connect from "./config/db-connection.js";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

/** express middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json("Up");
});

/** middleware */
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  /** mongodb connection */
  connect();
  console.log(`server is up : http://localhost:${PORT}`);
});
