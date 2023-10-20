import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { corsOrigins, DBconnection } from "./configs/index.js";
import { products } from "./routes/index.js";

// Configs
const app = express();
dotenv.config();
app.use(cors(corsOrigins));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/products", products);
app.use("/*", (req, res) => res.status(400).json({ method: req.method, url: req.url, message: "Path Not Exist." }));

// Mongo
DBconnection();
mongoose.connection.on("connected", () => console.log(`Server Connected 🚀`));
mongoose.connection.on("disconnected", () => console.log(`Server Disconnected 😢`));

// Server Listenning
app.listen(process.env.PORT || 5000);
