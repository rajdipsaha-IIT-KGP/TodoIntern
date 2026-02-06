const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"To_Do_Internship"
        })
        console.log("Connected to DataBase")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {connectDB}