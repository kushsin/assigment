const { replaceOne } = require("../module/schma");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const SECRET_KEY = 'yourSecretKey'
const User = require('../module/schma');
const authmiddleware = async(req,res,next) => {
 const token = req.header('authorization');
 if(!token){
       return res.status(401).json({msg: 'No Token Provided'});                 
 }
 const jwtToken = token.replace("Bearer",'').trim();
 try{
       // verify the token to get user data
    const decoded =   jwt.verify(jwtToken,SECRET_KEY);
       console.log(decoded);
       req.user = decoded;   
       console.log(req.user.id);                    
             // finduser data
             let userData = await User.find({_id :req.user.id}).select({hash_password : 0})
             req.user = userData
             req.token = token
             req.userId = userData._id
             next();               
             
 }catch(error) {
      console.log(error);
      return res.status(401).json({
        message: 'Auth failed'
      })
    }

}
module.exports = authmiddleware;