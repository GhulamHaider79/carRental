import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlegth: 6,

    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"], 
        default: "user",
    },
    
});


const User = mongoose.model("User", userSchema);

export default User;