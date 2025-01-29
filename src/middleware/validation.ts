import { body, validationResult } from "express-validator";
import {Request, Response, NextFunction} from "express";

const handleValidationErrors = async (req: Request, res:Response, next: NextFunction) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status (400).json ({errors: errors.array()});
    }
    next ();
};

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must not be include numbers "),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a Srting "),
    body("mobileNumber").isString().notEmpty().withMessage("Mobile number must be a string "),
    handleValidationErrors,
];

export const validateMyBookStoreRequest = [
    body("bookStoreName").notEmpty().withMessage("BookStore Name is required "),
    body("city").notEmpty().withMessage("City is required "),
    body("deliveryPrice").isFloat({min:0}).withMessage("Delivary Price must be a positive number "),
    body("estimatedDelivaryTime").isInt({min:0}).withMessage("Estimated delivery time must be a positive integer "),
    body("category").isArray().withMessage("Category must be an array").not().isEmpty().withMessage("Category array cannot be empty"),
    body("bookItem.*.name").notEmpty().withMessage("Book Item name is required "),
    body("bookItem.*.price").isFloat({min:0}).withMessage("Book item price is required and must be a positive number"),
    handleValidationErrors,
];