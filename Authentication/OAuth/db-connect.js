import mongoose from "mongoose";

async function dbConnect (){
    
    mongoose.connect("mongodb://0.0.0.0/users").then(()=>{
    console.log("DB connected")
})
}


export default dbConnect; 
