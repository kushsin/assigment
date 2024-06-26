const nodemailer = require('nodemailer');
const MailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "thakurkushbundela@gmail.com",
      pass: "gvyzruqsmstqarej",
    },
  });
  const sendMail = async(email,subject,msg,) => {
try{
    let info = await MailTransporter.sendMail({
        from: 'thakurkushbundelagmail.com', // sender address
        to: email ,// list of receivers
        subject: subject, // Subject line
        text: msg, // plain text body
      
        });
        console.log("Message sent: %s", info.messageId);
        }catch(error){
            return error;
            };

  }
  module.exports = sendMail;