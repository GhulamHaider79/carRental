import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  carName: { 
    type: String, 
    required: true 
   },
  brand: { 
    type: String, 
    required: true 
},
  model: { 
    type: String, 
    required: true 
},
  pricePerDay: { 
    type: Number, 
    required: true 
},
  available: { 
    type: Boolean, 
    default: true 
},
  image: { 
    type: String, 
    required: true 
},
  description: { 
    type: String 
  },
  location: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

const Car = mongoose.model('Car', CarSchema);

export default Car;
