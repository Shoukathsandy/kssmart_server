import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors"
import {reglogRouter} from "./routes/reglog.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
 const MONGO_URL = process.env.MONGO_URL
// const MONGO_URL = "mongodb://localhost";
// const MONGO_URL = 4000;
app.get("/", function (req,res){
    res.send("this page is home page");
});

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongodb connected successfully.");
    return client;
}
export const client = await createConnection();

app.use("/reglog",reglogRouter);
app.listen(PORT, ()=>console.log(`the server is started : ${PORT}`));
