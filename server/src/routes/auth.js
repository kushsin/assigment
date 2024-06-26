const express = require("express");
const router = express.Router();


const {Placeorder, signUp,login, verifyAccount,resetPassword,getallusedata, 
  updateUserData, deleteUser, SearchApi,handleResetPassword,VerifyResetPassOtp } = require("../controller/auth");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");
const authmiddleware = require("../middleware/auth_middleware");
const errMiddleware = require('../middleware/errorhandle');
// const {PostContectData,GetallcontectData, DeleteContect,UpdateContactData} = require("../controller/contactData");


// const otpMiddleware  = require('../middleware/otpMiddleware')
const otpMiddleware = require('../middleware/otpMiddleware')
// parse application/x-www-form-urlencoded && application/json
// const multer = require('multer');
// const path = require('path');
// // const placeOrderSchema = require("../module/PlaceOrderSchema");

//   const upload = multer({
//     storage : multer.diskStorage({
//       destination: (req, file, cb) => {
//         cb(null, path.join(__dirname,'../public/images'));
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, file.fieldname + "_" + Date.now() + ".jpg");
//     }
//     })
  
// }).single('user_file');
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//       cb(null, true);
//   } else {
//       cb(null, false);GetallcontectData
//   }
// }

router.route("/signup").post(validateSignUpRequest, isRequestValidated,signUp);
router.route("/signin").post(validateSignIpRequest, isRequestValidated, login);
router.route('/resetpassword').post(otpMiddleware,resetPassword);

// //varify OTP while updating password...................
router.route("/verify-otp").post(VerifyResetPassOtp);
router.route('/verifyAccount/:id').post(verifyAccount);
router.route('/handleResetPassword/:token').post(handleResetPassword);
// router.route('/updatePasswordUsingMailLink').post(updatePasswordUsingMailLink);
router.route('/userdata').get(authmiddleware, getallusedata);
// router.route('/service').get(ServiceData);
// router.route('/allusers').get(authmiddleware, getallusedata);
router.route('/userupdate/:id').patch(updateUserData);
router.route('/deleteuser/:id').delete(deleteUser); 

//contect data start route.....
// router.route('/contect').post(PostContectData);
// router.route('/getcontectdata').get(authmiddleware,GetallcontectData);
// router.route('/delete/:id').delete(DeleteContect);
// router.route( '/edit/:id').patch(UpdateContactData);
//contect data end route.......

// router.route('/productdata').get(allProduct);
// router.route('/productdata/:id').get(singalProduct);  
// router.route('/search/:name').get(authmiddleware,SearchApi);

//Place oredr scheme  
// router.route('/placeorder').post(Placeorder);
module.exports = router;