const { StatusCodes } = require("http-status-codes");
const User = require("../module/schma");
require("dotenv").config();
const crypto = require('crypto');
const path = require('path');
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const shortid = require("shortid");
const mailer = require('../validators/mailer');
const { use } = require("../routes/auth");
const multer = require('multer');
const { Console } = require("console");
// const upload = multer({ dest: 'uploads/' })
const tokendata = require('crypto').randomBytes(32).toString('hex');
// const placeOrderScheme = require('../module/PlaceOrderSchema')
//secret key ...............
var SECRET_KEY = "yourSecretKey";
var otpCode = '';
console.log(otpCode);
//SignUp Logic here...........

//upload image 
// let storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//       cb(null, './public/images') //save the files in images folder
//       },
//       filename: function (req, file, cb) {
//          let newName = `${shortid.generate()}-${file.originalname}`;
//          cb(null, newName); //rename the file before saving it on disk
//          }
//          });
//          var upload = multer({storage : storage}).single('image');
//          async function signupLogic(req, res){
//             try {
//                await upload(req,res);
//                if(req.fileValidationError || req.file == undefined) return res.send(StatusCodes.BAD_REQUEST).json({"error": "Image is required!"})


//             }catch(err){
//                return res.sendStatus(500)
//             }
//          }


const signUp = async (req, res) => {
   try {

      //get regiterdata from client...........  
      const name = req.body.name;
      const role = req.body.role;
      const email = req.body.email;
      const password = req.body.password;
      const PhoneNumber = req.body.phoneNumber
      console.log(name, email,role, password, PhoneNumber);

      //using multer...........
      //check data if data is blank.............
      if (!name || !role || !email || !password || !PhoneNumber) {
         return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Provide Required Information",
         });
      }
      //hashing password..............
      const hash_password = await bcryptjs.hash(password, 10);
      const userData = {
         name,
         email,
         role,
         hash_password,
         PhoneNumber
      };

      //find user in database if user already exist....
      const user = await User.findOne({ email });
      const token = jwt.sign({ email: email, isAdmin: "isAdmin" }, SECRET_KEY
         , { expiresIn: "1m" },)
      if (user) {
         res.status(StatusCodes.BAD_REQUEST).json({
            message: "User already registered",
         });
      } else {
         User.create(userData).then((data, err) => {
            res
               .status(StatusCodes.CREATED)
               .json({
                  message: "User created Successfully",
                  token: token,
                  email: email,
               });

            console.log({ message: "User created Successfully" });
         });
      }
   } catch (err) {
      console.error(`Error in Signup ${err}`);
   }
};

// Login logic here..............
const login = async function (req, res) {
   //get email id and password.....
   const email = req.body.email;
   const password = req.body.password;
   console.log(email, password);
   const user = await User.findOne({ email }).select("+password");

   //if user not found then first you have to register........
   if (!user) return res.status(StatusCodes.NOT_FOUND
   ).json({ message: "User Not Found!" });
   //check the password is correct or not...
   const validPass = await bcryptjs.compare(
      password,
      user.hash_password
   );
   if(!validPass){
      res.status(StatusCodes.BAD_REQUEST
      ).json({ message: "Invalid Password!"});
   }
   //genearte token using jwt 
   const token = jwt.sign({ id: user.id.toString(), isAdmin: "isAdmin" }, SECRET_KEY
      , { expiresIn: '1h' },)

   //if user valid then login successfully..........
   if (user && validPass) {
      res
         .status(StatusCodes.CREATED)
         .json({
            msg: "login successfull",
            token: token,
            userId: user._id,
         });
      // send mail to the user with a verification link
      console.log(token);
      user.save();
   };
};

// verify account using token from email
const verifyAccount = async function (req, res) {
   try {
      const user = await User.findByIdAndUpdate(req.params.id,
         { isVerified: true }, { new: true });
      if (!user) return res.status(StatusCodes.NOT_FOUND)
         .json({ message: "No such user found." })
      res.status(StatusCodes.OK).json(user);
   } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json
         ({ message: e.toString() })
   }
}

// if you forget the password then reset password.....

const resetPassword = async function (req, res) {
   const email = req.body.email;
   console.log(email);
   otpCode = Math.floor(1000 + Math.random() * 9000);
   var text = `Your OTP code is ${otpCode}.`
   const user = await User.findOne({ email: email });

   const token = crypto.randomBytes(20).toString('hex');
   if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email not registered' })
   }
   else {
      res.status(200).json(user._id);
      mailer(email, "LogIn OTP", text);
      console.log(token, email);
      user.resetToken = token;
      user.resetExpire = Date.now() + 10 * 60;
      user.verifyToken = ""
      user.save();
   }
}
//varify OTP............
const VerifyResetPassOtp = async (req, res) => {
   const  {otp} = req.body;
    console.log(otp)
   if (otp === otpCode && otpCode != null) {
      console.log('OTP verification successful!');
      res.status(200).send({ message: 'OTP verification successful' });
   } else {
      console.log('Invalid OTP');
      res.status(401).send({ message: 'Invalid OTP' });
   }

}
// handle the request coming from /users/resetpassword/:token
const handleResetPassword = async function (req, res) {
   let user = await User.findOne({
      _id: req.params.token,
      // resetExpire:{$gt:Date.now()}
   });
   console.log("idbasic", user);
   //   await user.save()
   try {
      var newpassword = req.body.newpassword;
      if (!user) {
         return nextTick(res.status(400).send('invalid Token'));
         // res.status(400).send('invalid Token');
      } else {
         //genSaltSync
         // const salt = await bcryptjs.genSaltSync(10)
         const newPassword = await bcryptjs.hash(newpassword, 10);
         const updatepass = await User.updateOne({ _id: req.params.token }, { $set: { hash_password: newPassword, /*verifyToken : ""*/ } });
         user.password = updatepass;
         user.verifyToken = null;
         user.resetExpire = null;
         await user.save()
         res.status(200).send({ message: "Password Updated Successfully" })
      }
   } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
   }
}


const getallusedata = async (req, res) => {
   try {
      const user = await User.find({})
      res.status(200).json(user);
      } catch (e) {
         console.log(e);
         res.status(500).json({ error: e });
         }

 
}

//   const updateUserData = async(req,res) => {
//    const {firstName,lastName,email} = req.body;
//    const id = req.params.id;
//    User.findByIdAndUpdate(id,{
//       firstName : firstName ,
//       lastName : lastName ,
//       email : email
//       },{new:true},(err,updatedUser)=>{
//          if(err) return res.status(400).json("Error in updatingthe data");
//          else{
//             res.status(200).json(updatedUser);
//             }
//             })
//   }
const updateUserData = async (req, res) => {
   const _id = req.params.id;
   const update_data = await User.findByIdAndUpdate(_id, req.
      body, {
      new: true
   });
   var savedata = await update_data.save();
   if (savedata) {
      res.status(200).send(savedata)
      console.log(savedata)
   } else {
      res.status(404).send(`data not updated`)
   }

};

const deleteUser = async (req, res) => {
   const _id = req.params.id;
   console.log(_id)
   try {
      const deleteData = await User.deleteOne({ _id }, { new: true });
      console.log(deleteData);
      if (!deleteData) {
         return res.status(400).json('No user withthis ID');
      } else {

         return res.status(200).json(deleteData);
      }


   } catch (err) {
      return res.status(500).json({ msg: 'Server error' })
   }
}

//search API
const SearchApi = async (req, res) => {
   const name = req.params.name;
   console.log(name)
   const regex = RegExp(name, 'i')
   const serdata = await User.find({ firstName: regex });
   console.log(serdata)
   if (!serdata) return res.status(400).json('No User Found')
   res.status(200).json(serdata)
}
const Placeorder = async(req,res) => {
const {firstname, lastname, city, zip, address, email} = req.body;
console.log(req.body);
const data = await placeOrderScheme.create({firstname, lastname, city, zip, address, email})
if(!data){
return res.status(400).json("Failed to create Order")
}else{
return res.status(201).json({massege : "order detail added successfully", orderDetail : data})
}
}

module.exports = {
   signUp,
   getallusedata,
   mailer,
   login,
   resetPassword,
   verifyAccount,
   handleResetPassword,
   updateUserData,
   deleteUser,
   SearchApi,
   VerifyResetPassOtp,
   Placeorder,
   
}
















