import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, index: true},
  age: {type: Number, required: true},
  password: {type: String, required: true},
  rol: {type: String, required: true, default: "usuario"}
});

export const userModel = mongoose.model(usersCollection, userSchema);