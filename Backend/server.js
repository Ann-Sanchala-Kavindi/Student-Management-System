const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");


const app=express();

require("dotenv").config();

const PORT=process.env.PORT || 8070;

app.use(express.json());

const URL=process.env.MONGODB_URL;


mongoose.connect(URL)
.then(() => {
    console.log("MongoDB Connection Success!");
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
});

const studentRouter=require("./routes/students.js");

app.use("/students", studentRouter);

app.listen(PORT, ()=>{
    console.log("Server is up and running on port " + PORT)
})



