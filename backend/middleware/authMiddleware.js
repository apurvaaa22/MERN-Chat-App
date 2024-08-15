const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
const expressAsyncHandler = require("express-async-handler");

const JWT_SECRET = 'apurva'

const protect = expressAsyncHandler(async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
         token = req.headers.authorization.split(" ")[1];

         //decodes token id
         const decoded = jwt.verify(token, JWT_SECRET);

         req.user = await User.findById(decoded.id).select("-password");

         next();

      } catch (err) {
         res.status(401);
         console.log(err);
         throw new Error("Not Authorized,token failed");
      }
   }

   if (!token) {
      res.status(401);
      throw new Error("Not Authorized,token failed")
   }
});

module.exports = { protect };