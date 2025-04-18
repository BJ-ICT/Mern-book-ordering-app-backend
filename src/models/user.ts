import { ObjectId } from "mongodb";
import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema ({
    _id: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId(),
      
    },
    email:{
        type: String,
        required : true
    },
    name:{
        type: String,
        
    },
    addressLine1:{
        type: String,
        
    },
    city :{
        type: String,
        
    },
    mobileNumber:{
        type: String,
        
    },
});

const User = mongoose.model("User",userSchema);
export default User;