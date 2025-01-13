import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Cookies from "js-cookie"; 

const RegisterCar = () => {
  const [carName, setCarName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('carName', carName);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('pricePerDay', pricePerDay);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/car/register', formData, {
       withCredentials: true,
      });

      console.log(response.data);
      // Handle successful registration (e.g., display success message, redirect)
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message || 'An error occurred');
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0] || null); 
  };
  return (
    <div className="container mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register Car</h2>
        {errorMessage && (
          <p className="text-red-500 mb-4">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="carName" className="block text-sm font-medium text-gray-700">
              Car Name:
            </label>
            <input
              type="text"
              id="carName"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brand:
            </label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Model:
            </label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">
            Price Per Day:
            </label>
            <input
              type="number"
              id="pricePerDay"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image:
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Register Car
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterCar;