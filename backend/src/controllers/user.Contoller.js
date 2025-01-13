import User from "../models/user.js";
import bcrypt from "bcrypt";
import  { uploadCloudinary } from "../lib/cloudinary.js";
import fs from 'fs';
import { generateToken } from '../utils/jwt.js'

// register function
export const register = async (req, res) => {
  // destructure the request body
   const { fullName, email, password, role,} = req.body;

   try {
      if (!fullName || !email || !password || !role) {
         return res.status(400).json({ message: " All fields are required " })
      }
      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({ message: "User already exists" });
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = new User({
         fullName,
         email,
         password: hashedPassword,
         role,
      });

      if (user) {
       // generate token and set to cookie it is a function in utils/jwt.js
          generateToken(user._id, res);
          // save user to database
         await user.save();
         // send response to client
         res.status(201).json({
            message: 'User created successfully',
            user: {
               _id: user._id,
               fullName: user.fullName,
               email: user.email,
               profilePic: user.profilePic,
               role: user.role
            }
         });
      } else {
         return res.status(400).json({ message: 'Error creating user' });
      }

   } catch (error) {
      res.status(404).json({ message: "User not registered" })
   }
};


export const login = async (req, res) => {
   const { email, password } = req.body
   try {
       const user = await User.findOne({ email });
       if(!user){
           return res.status(400).json({ message: 'invalid credentials' });
       };
       const isPasswordCorrect = await bcrypt.compare(password, user.password);
       if (!isPasswordCorrect) {
           return res.status(400).json({ message: 'invalid credentials' });
       };
       generateToken(user._id, res);
       res.status(200).json({
           message: 'Login successfully',
           _id: user._id,
           fullName: user.fullName,
           email: user.email,
           profilePic: user.profilePic,
       });
     
       
   } catch (error) {
       console.log("error in login", error);
       res.status(500).json({ message: "Internal Server error in login" });
       
   }
};


export const logout = (req, res) => {
   console.log("user logout");
   
   try {
       res.cookie('Auth_Token', '', {maxAge: 0});
       res.status(200).json({ message: 'Logged out successfully' });
   } catch (error) {
       console.log("error", error);
       res.status(500).json({ message: "Internal Server error" });
       
   }
};

export const updateProfile = async ( req, res ) => {
   
  try {

   if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    
    // Path to the uploaded file
    const localFilePath = req.file.path;

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
    }
     // Delete local file after upload
     fs.unlinkSync(localFilePath);

     const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: cloudinaryResponse.secure_url },
      { new: true }
    );

    res.status(200).json({
      message: 'Update successfully',
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      role: updatedUser.role
  });
   
  } catch (error) {
   
  }
};