const express = require("express");
const app = express();
const diary = require("./routes/diary");
const user = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const prod = require("./prod");
prod(app);
require("express-async-errors");
const config = require("config");
console.log(config.get("db"));

if (!config.get("jwtPrivateKey")) {
  console.error("jwt privatekey not defined!");
  process.exit(1);
}

app.use(
  cors({
    exposedHeaders: ["x-auth-token"], //returns the x-auth-token
  })
);
app.use(cors())
app.use(express.json());

//routing
app.get("/test", (req,res)=>{
    res.send("test works")
})
app.use("/api/v1/diary", diary);
app.use("/api/v1/user", user);

//error
app.use(errorHandler); // reference, not calling!

//database connection
mongoose
  .connect("mongodb://mongo:27017/")
  .then(() => {
    console.log("running");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log(`running...`);
});
