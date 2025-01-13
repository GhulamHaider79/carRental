// src/components/CarCard.jsx
const CarCard = ({ car }) => {
    return (
      <div className="bg-white shadow-md rounded p-4">
        <img src={car.image} alt={car.carName} className="w-full h-48 object-cover rounded" />
        <h2 className="text-lg font-bold mt-2">{car.carName}</h2>
        <p className="text-gray-600">{car.brand} - {car.model}</p>
        <p className="text-blue-500 font-bold">${car.pricePerDay} / day</p>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Book Now
        </button>
      </div>
    );
  };
  
  export default CarCard;
  