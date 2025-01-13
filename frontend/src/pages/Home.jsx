import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import axios from "axios";


const Home =  () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Fetch all cars from the backend
        const response = await axios.get("http://localhost:5000/api/cars");
        setCars(response.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars. Please try again later.");
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Available Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Home;
