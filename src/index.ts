 import express, {Request, Response} from "express";
 import cors from "cors";
 import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";

//setting entry point to connect database
 mongoose
        .connect(process.env.MONGODB_CONNECTION_STRING as string)
        .then (() => console.log("Connected to the Database !!! "));


 // create new express server
 const app = express();
 app.use(express.json());
 app.use(cors());

app.get("/health",async (req: Request, res: Response)=> {
   res.send({message: "Heath OK!"});
});



 // send requests and show respose. this is come from express.
app.use ("/api/my/user", myUserRoute);



 app.listen (7000, ()=> {
    console.log ("server started on localhost:7000");
 });