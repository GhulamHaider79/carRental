import Car from '../models/car.js';
import fs from 'fs'; 
import  { uploadCloudinary } from "../lib/cloudinary.js";

// Register a new car
export const register = async (req, res) => {

  try {
    const { carName, brand, model, pricePerDay, description, location } = req.body;

    if (!carName || !brand || !model || !pricePerDay || !location) {
        return res.status(400).json({ message: "All required fields must be provided" });
      };

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    };

    const localFilePath = req.file.path;
   
    const cloudinaryResponse = await uploadCloudinary(localFilePath);
    console.log(cloudinaryResponse);
    
    if (!cloudinaryResponse) {
        return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
      };

      // Delete local file after upload
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      };

    const car = new Car({
      carName,
      brand,
      model,
      pricePerDay,
      description,
      location,
      image: cloudinaryResponse.secure_url,
    });

    await car.save();

    res.status(201).json({ message: 'Car registered successfully', car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update car details and replace the image
export const updateCar = async (req, res) => {
  try {
    const { carId, carName, brand, model, pricePerDay, description, location } = req.body;

    // Validate required fields
    if (!carId) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    // Find the car in the database
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Check if a new image is uploaded
    let updatedImageUrl = car.image; // Keep the current image URL if no new image is provided
    if (req.file) {
      const localFilePath = req.file.path;

      // Upload new image to Cloudinary
      const cloudinaryResponse = await uploadCloudinary(localFilePath);

      if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        return res.status(500).json({ message: "Failed to upload new image to Cloudinary" });
      }

      // Update the image URL
      updatedImageUrl = cloudinaryResponse.secure_url;

      // Delete the local file
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    }

    // Update car details
    car.carName = carName || car.carName;
    car.brand = brand || car.brand;
    car.model = model || car.model;
    car.pricePerDay = pricePerDay || car.pricePerDay;
    car.description = description || car.description;
    car.location = location || car.location;
    car.image = updatedImageUrl;

    // Save updated car
    await car.save();

    res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
