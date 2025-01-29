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
// Get /api/my/restaurant
router.get("/", jwtCheck, jwtParse, MyBookStoreController.getMyBookStore)

// /api/my/bookstore

router.post ("/",validateMyBookStoreRequest,jwtCheck, jwtParse, upload.single("imageFile"),
MyBookStoreController.createMyBookStore);

router.put ("/",validateMyBookStoreRequest,jwtCheck, jwtParse, upload.single("imageFile"),
MyBookStoreController.updateMyBookStore)

export default router;
