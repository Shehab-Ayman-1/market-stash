import express from "express";
import { GET_BILLS, GET_BILL } from "../controllers/index.js";
import { CREATE_BILL, CREATE_CLIENT } from "../controllers/index.js";
import { UPDATE_CLIENT } from "../controllers/index.js";
import { DELETE_BILL } from "../controllers/index.js";

export const router = express.Router();

// GET
router.get("/get-bills", GET_BILLS);
router.get("/get-bill/:id", GET_BILL);

// CREATE
router.post("/create-bill", CREATE_BILL);
router.post("/create-client", CREATE_CLIENT);

// UPDATE
router.put("/update-client", UPDATE_CLIENT);

// DELETE
router.delete("/delete-bill/:id", DELETE_BILL);
