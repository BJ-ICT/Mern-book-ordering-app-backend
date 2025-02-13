import express from "express";
import multer from "multer";
import MyBookStoreController from "../controllers/MyBookStoreController";
import jwtCheck, { jwtParse } from "../middleware/auth";
import { validateMyBookStoreRequest } from "../middleware/validation";


const router = express.Router();

const storage = multer.memoryStorage();
const upload  = multer({
    storage:storage,
    limits: {
        fileSize : 5 * 1024 * 1024, // 5mb
    },
});
// Get /api/my/bookstore
router.get("/", jwtCheck, jwtParse, MyBookStoreController.getMyBookStore);

// /api/my/bookstore

router.post ("/",
    upload.single("imageFile") ,
    validateMyBookStoreRequest,
    jwtCheck, 
    jwtParse, 
    MyBookStoreController.createMyBookStore);

router.put ("/",
    upload.single("imageFile") ,
    validateMyBookStoreRequest,
    jwtCheck, 
    jwtParse, 
    MyBookStoreController.updateMyBookStore)

export default router;
