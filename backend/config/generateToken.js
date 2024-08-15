const jwt = require("jsonwebtoken");
const mongoose=require("mongoose");

const JWT_SECRET='apurva'

const generateToken=(id)=>{
    return jwt.sign({id},JWT_SECRET,{
        expiresIn:"30d",
    });
};

const userId = new mongoose.Types.ObjectId();
const token = generateToken(userId.toString());
console.log('Generated Token:', token);

module.exports=generateToken;

