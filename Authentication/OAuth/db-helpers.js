import mongoose, { Mongoose } from "mongoose";
const User = mongoose.model(
    "User",
    new mongoose.Schema({
      username: { type: String, required: true },
      password: { type: String, required: true }
    })
  );

export default User