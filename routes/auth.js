import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//jwt token verfify function
export async function auth(req, res, next) {
  
    try {
        const data=req.header("x-auth-token");
       
        jwt.verify(data,process.env.SECRET_KEY);
        next();
    }
    catch (err) {
     res.status(401).send({'error':err.message})
    }
    
}