import express from "express";
import { createuser, createemployerdetails, getuserbyid,getallemployerdetails,deleteemployee,updateemployebyid} from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "./auth.js";

const router = express.Router();

async function genhashpassword(password) {
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password, salt);
    // console.log(hashedpassword);
    return hashedpassword;

}


router.post("/register", async function (req, res) {
    try {
        const {
            username,password } = req.body;
        const hashedpassword = await genhashpassword(password);
        const isexistuser = await getuserbyid(username);
        console.log(hashedpassword, isexistuser);
        if (isexistuser) {
            res.status(401).send({ error: "choose another mail" }
            );
        } else {
            const result = await createuser(
                {
                    username:username,
                    password: hashedpassword,
                    

                })
            console.log(result);
            res.status(200).send({ msg: "successfull register" });
        }
    } catch (err) { res.status(500).send("internal server error") }});





router.post("/login",auth, async function (req, res) {
    const { username, password } = req.body;
    const usernamefromdb = await getuserbyid(username);
    console.log(usernamefromdb);
    if (!usernamefromdb) {
        res.status(401).send({error:"invalid password or email"});
    } else {
        const storedpassword = usernamefromdb.password;
        const ispasswordmatch = await bcrypt.compare(password, storedpassword);
        console.log(ispasswordmatch);
        if (ispasswordmatch) {
            const token = jwt.sign({ username: usernamefromdb._id }, process.env.SECRET_KEY);
            res.send({ msg: "successfull login", token: token });
        } else {
            res.status(401).send({error:"invalid password or email"});
        }
    }
});

router.post("/employeedetails",async function(req,res){
    const data = req.body;
    const result = await createemployerdetails(data);
    // res.send(result);
   if(result===null) {
    console.log({error:"this is null entry"});
   }else{
    res.send(result);
    }
})

router.get("/getallemployerdetails",async function(req,res){
 
    const result = await getallemployerdetails();
    res.send(result);
  
 
})

router.delete("/:id",async function(req,res){
    console.log(req.params); 
    const {id}= req.params;
    const movie=  await deleteemployee(id);
   movie.deletedCount>0 ? res.send(movie) : res.status(404).send("match not found")
})

router.put("/:id", async function(req,res){
    const data=req.body;
    const {id}= req.params;
    console.log(data);
   const result=await updateemployebyid(id, data);
   res.send(result);
  });

export const reglogRouter = router;