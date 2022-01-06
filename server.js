require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/foodRoutes.js");
const app = express();
const user_name=process.env.user_name
const user_password=process.env.user_password

let port=process.env.port
let host =process.env.host

app.use(express.static("routes"))

app.use(express.json());

  mongoose.connect( `mongodb+srv://${user_name}:${user_password}@cluster0.zab2y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`),
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }

app.use(foodRouter);

app.listen(port, () => {
  console.log(`Server is running :${host}:${port}`)
});




