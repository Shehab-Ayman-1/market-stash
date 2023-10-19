import express from "express";
import { EDIT_PRICE, GET_COMPANY, GET_HOME_COMPANIES, GET_LISTS, SALE_PRODUCTS, TABLE_LISTS } from "../controllers/index.js";
import { CREATE_CATAGORY, CREATE_COMPANY, CREATE_PRODUCTS } from "../controllers/index.js";
import { UPDATE_CATAGORY, UPDATE_COMPANY, UPDATE_PRODUCT } from "../controllers/index.js";
import { DELETE_CATAGORY, DELETE_COMPANY, DELETE_PRODUCT } from "../controllers/index.js";
import { BUY_PRODUCTS } from "../controllers/index.js";

export const router = express.Router();

// GET
router.get("/get-home-companies", GET_HOME_COMPANIES);
router.get("/get-lists", GET_LISTS);
router.get("/get-table-lists", TABLE_LISTS);
router.get("/get-company/:id", GET_COMPANY);

// CREATE
router.post("/create-catagory", CREATE_CATAGORY);
router.post("/create-company", CREATE_COMPANY);
router.post("/create-products", CREATE_PRODUCTS);

// UPDATE
router.put("/update-catagory", UPDATE_CATAGORY);
router.put("/update-company", UPDATE_COMPANY);
router.put("/update-product", UPDATE_PRODUCT);

router.put("/buy-products/:companyId/:productId", BUY_PRODUCTS);
router.put("/edit-price/:companyId/:productId", EDIT_PRICE);
router.put("/sale-products/:companyId/:productId", SALE_PRODUCTS);

// DELETE
router.delete("/delete-catagory", DELETE_CATAGORY);
router.delete("/delete-company", DELETE_COMPANY);
router.delete("/delete-product", DELETE_PRODUCT);
