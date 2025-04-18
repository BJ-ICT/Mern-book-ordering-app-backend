import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";
import {v2 as cloudinary} from "cloudinary";
import MyBookStoreRoute from "./routes/MyBookStoreRoute";
import bookStoreRoutes from "./routes/BookStoreRoute"
import MyUserRoutes from "./routes/MyUserRoutes";
import BookStoreRoute from "./routes/BookStoreRoute";

//setting entry point to connect database
 mongoose
        .connect(process.env.MONGODB_CONNECTION_STRING as string)
        .then (() => console.log("Connected to the Database !!! "));

cloudinary.config ({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,

});


 // create new express server
 const app = express();
 app.use(express.json());
 app.use(cors());



 // send requests and show respose. this is come from express.
app.use ("/api/my/user", MyUserRoutes);
app.use ("/api/my/bookstore",MyBookStoreRoute);
app.use ("/api/bookstore",BookStoreRoute);


 app.listen (7000, ()=> {
    console.log ("server started on localhost:7000");
 });