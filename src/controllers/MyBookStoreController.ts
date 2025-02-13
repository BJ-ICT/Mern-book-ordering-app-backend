import { Request, Response } from "express";
import Bookstore from "../models/bookstore";
import cloudinary from "cloudinary";
import mongoose from "mongoose";


const getMyBookStore = async ( req: Request, res: Response ) => {
    try {

      const bookstore = await Bookstore.findOne ({ user: req.userId});
      if (!bookstore) {
        return res.status(404).json({ message: "bookstore not found" });
      }
      
      res.json (bookstore);
    } catch (error) {
      console.log ("error",error);
      res.status(500).json({message: "Error fetching bookstore "});
    }
}

const createMyBookStore = async (req: Request, res: Response) => {
    // Meka karanna
    try {

        const existingBookStore = await Bookstore.findOne ({user: req.userId});


        if (existingBookStore) {
            return res .status (409) .json({message: "User BookStore already exist"});
        }
        // Some weired code set. Creating Base64 string base on the image buffer. Which is somthing that explain about the image
      // const image = req.file as Express.Multer.File;
      // const base64Image = Buffer.from(image.buffer).toString ("base64");
      // const dataURI = `data:${image.mimetype};base64,${base64Image}`;

      // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

      // commented above line, because it used before as a quick reference
      //in case the code does not work 

      const imageUrl =  await uploadImage (req.file as Express.Multer.File)

        const bookstore = new Bookstore (req.body);
        bookstore.imageUrl = imageUrl;
        bookstore.user = new mongoose.Types.ObjectId (req.userId);
        bookstore.lastUpdate = new Date ();
        await bookstore.save();

        res.status (201).send (bookstore);

    // Eka karala waradunoth meka wenne
    } catch (error) {
        console.log(error);
        res.status(500).json ({message : "Somthing Went Wrong"});

    }

};

const updateMyBookStore = async (req: Request, res: Response) => {
  try {
    const bookstore = await Bookstore.findOne({
      user: req.userId,
    });
    if (!bookstore) {
      return  res.status(404).json ({message: "bookstore not found"});
    }
    bookstore.bookStoreName = req.body.bookstoreName;
    bookstore.city = req.body.city;
    bookstore.deliveryPrice = req.body.deliveryPrice;
    bookstore.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    bookstore.category = req.body.category;
    bookstore.bookItem = req.body.bookItem;
    bookstore.lastUpdate = new Date ();

    if (req.file) {
      const imageUrl =  await uploadImage (req.file as Express.Multer.File);
      bookstore.imageUrl = imageUrl;
    }
    await bookstore.save ();
    res.status(200).send(bookstore);

  } catch (error) {
    res.status(500).json ({message:"Something went wrong"});
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file ;
        const base64Image = Buffer.from(image.buffer).toString ("base64");
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;

        const uploadResponse  = await cloudinary.v2.uploader.upload(dataURI);
        return uploadResponse.url;
};

export default {
    getMyBookStore,
    createMyBookStore,
    updateMyBookStore
};