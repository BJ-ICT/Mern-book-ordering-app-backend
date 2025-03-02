import mongoose, {InferSchemaType} from "mongoose";

const bookItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
      },
    
    name: {type: String, required: true},
    price: { type: Number, required: true},
});

export type MenuItemType = InferSchemaType<typeof bookItemSchema>;

const bookStoreSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    bookStoreName: {type: String, required:true},
    city: {type: String, required: true},
    deliveryPrice: {type: Number, required: true},
    estimatedDeliveryTime: {type: Number, required: true},
    category: [{type: String, required: true}],
    bookItem: [bookItemSchema],
    imageUrl: {type: String, required: true},
    lastUpdate : {type: Date, required: true},


});

const bookstore = mongoose.model("bookstore", bookStoreSchema);

export default bookstore;