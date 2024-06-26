// const otpMiddleware = (req, res, next) => {
//     const { email, otp } = req.body;
  
//     if (!email || !otp) {
//       return res.status(400).send({ message: 'Email and OTP are required' });
//     }
  
//     const storedOTP = otpCodes[email];
  
//     if (!storedOTP || storedOTP !== otp) {
//       return res.status(401).send({ message: 'Invalid OTP' });
//     }
  
//     delete otpCodes[email];
  
//     next();
//   };
  
//   module.exports = {
//     otpMiddleware,
//   };
const User = require('../module/schma');
const mailer = require('../validators/mailer');
const crypto = require( "crypto" ); 
const otpMiddleware = async(req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  // Generate a unique OTP
  const otp = crypto.randomInt(100000, 999999);

  // Send the OTP to the user's email
  // const transporter = nodemailer.createTransport({ /* your SMTP settings */ });
  // await transporter.sendMail({
  //   from: 'your-email@example.com',
  //   to: user.email,
  //   subject: 'Password Reset',
  //   text: `Your OTP is ${otp}`
  // });
  mailer(user.email, "LogIn OTP", `Your OTP is ${otp}`);
  // Store the OTP in the request object
  req.otp = otp;
  req.otpExpiration = Date.now() + 1000 * 60 * 5; // expires in 5 minutes
  user
  next();
};

module.exports = otpMiddleware;