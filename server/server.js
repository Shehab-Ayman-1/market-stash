import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { corsOrigins, DBconnection } from "./configs/index.js";
import { products, bills } from "./routes/index.js";

// Configs
export const app = express();
dotenv.config();
app.use(cors(corsOrigins));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
// app.use("/*", (req, res, next) => setTimeout(() => next(), 500));
app.use("/api/products", products);
app.use("/api/bills", bills);
app.use("/*", (req, res) => res.status(400).json({ method: req.method, url: req.url, message: "Path Not Exist." }));

// Mongo
DBconnection();
mongoose.connection.on("connected", () => console.log(`Server Connected 🚀`));
mongoose.connection.on("disconnected", () => console.log(`Server Disconnected 😢`));

// Server Listenning
app.listen(process.env.PORT || 5000);
export default app;
