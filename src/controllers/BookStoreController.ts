import {Request, Response} from "express";
import BookStore from "../models/bookstore";
import { validateMyBookStoreRequest } from "../middleware/validation";

const searchBookStore= async (req: Request, res: Response) => {
    try {
        const city = req.params.city;
        // the thing that we type in search bar define as searchQuery
        const searchQuery = (req.query.searchQuery as string ) || "";
        const selectedCategeories = (req.query.selectedCategeories as string ) || "";
        const sortOption = (req.query.sortOption as string ) || "lastUpdated";
        const page = parseInt(req.query.page as string ) || 1;

        let query: any = {};

        //london = London
        query["city"] = new RegExp (city,"i");
        const cityCheck = await BookStore.countDocuments(query)

        if (cityCheck === 0) {
            return  res.status(404).json([]);
       }

       if (selectedCategeories) {

        // URL = selectedCategeories = fiction, noval, fantacy
        // [fiction,noval,fantacy]
        const categeoriesArray = selectedCategeories .split(",") .map((categeory) => new RegExp(categeory, "i"));

        query["categeories"] = {$all: categeoriesArray};

       }

       if (searchQuery) {

        // bookStoreName = Minsara
        // categeories = [fiction, noval, fantacy]
        // searchQuery = Noval

        const searchRegex = new RegExp (searchQuery, "i");
        query ["$or"] = [
            {bookStoreName: searchRegex},
            {categeories: {$in: [searchRegex]}},
        ];
       }

       const pageSize = 10;
       const skip = (page-1) * pageSize;
       // sortOption = "lastUpdated"
       const bookstore = await BookStore.find(query)
       .sort ({[sortOption]: 1 })
       .skip(skip)
       .limit(pageSize)
       .lean();

       const total = await BookStore.countDocuments(query);

       const response = {
        data: bookstore,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / pageSize), // 50 results, pageSize = 10 > page 5
        },
       };

       res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
};

export default {
    searchBookStore,

}