import express from "express";
import { GET_BILLS, GET_BILL, CREATE_BILL, UPDATE_BILL, UPDATE_CLIENT, PAYMENT, DELETE_BILL } from "../controllers/index.js";

export const router = express.Router();

// GET
router.get("/get-bills", GET_BILLS);
router.get("/get-bill/:id", GET_BILL);

// CREATE
router.post("/create-bill", CREATE_BILL);

// UPDATE
router.put("/update-bill/:id", UPDATE_BILL);
router.put("/payment/:id", PAYMENT);
router.put("/update-client", UPDATE_CLIENT);

// DELETE
router.delete("/delete-bill/:id", DELETE_BILL);
