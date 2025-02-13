import express from "express";
import { param } from "express-validator";
import BookStoreController from "../controllers/BookStoreController";


const router = express.Router();


// /api/bookstore/search/colombo
router.get("/search/:city", param ("city").isString().trim().notEmpty()
.withMessage("City parament must be a valid string"),
BookStoreController.searchBookStore
);

export default router;