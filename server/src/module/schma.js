const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  name: {
     type: String,
     require: true,
     trim: true,
     min: 3,
     max: 20,
  },
 role : {
   type: String,
   enum: ['student', 'teacher', 'Institute'],   
 },
  username: {
     type: String,
     require: true,
     trim: true,
   //   unique: true,
     lowercase: true,
     index: true,
  },
  email: {
     type: String,
     require: true,
     trim: true,
   //   unique: true,
     lowercase: true,
  },
  hash_password: {
     type: String,
     require: true,
  },
  
  PhoneNumber : {
   type: String,

  }

},{ timestamps: true });
//For get fullName from when we get data from database
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.method.generateToken = function(){
   try{
    jwt.sign({_id: this._id,
         email : this.email,
         isAdmin : this,isAdmin

      }, process.env.JWT_KEY,
      {
         expiresIn: "30d"
      }
      )
      //Setting expiration date for the token to be valid only for 30 days
      
   }catch(err){
      throw new Error('Error generating Token');
   }

      
}

userSchema.method({
  async authenticate(password) {
     return bcryptjs.compare(password, this.hash_password);
  },
});

module.exports =  mongoose.model("registrationdata", userSchema); 