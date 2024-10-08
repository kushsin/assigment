const express = require("express");
require("dotenv").config();
const connectDB = require("./db/conne");
const app = express();
var cors = require("cors");
const authRouter = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use("/",authRouter);


// app.use(authRouter)
//Port and Connect to DB
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB('mongodb://0.0.0.0:27017/NEWKUSH');
    app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
      console.log("error =>", error);
  };
};
start();