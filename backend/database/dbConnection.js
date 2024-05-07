import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose
    .connect(process.env.MONGO_URI, {
       dbName: "PROGRESSIVE_TRAINING_COMPANY" 
    })
    .then(()=>{
        console.log('Connected to database!')
    })
    .catch((err)=>{
        console.log(`Some Error occured whuile connecting to database. ${err}`);
    })
}