import { body, validationResult } from "express-validator";
import {Request, Response, NextFunction} from "express";

const handleValidationErrors = async (req: Request, res:Response, next: NextFunction) => {

    const errors = validationResult (req);
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