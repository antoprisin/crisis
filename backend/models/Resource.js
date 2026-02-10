const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    category: { type: String, required: true, enum: ['food', 'shelters', 'doctors', 'healthCenters', 'bloodBanks'] },
    name: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 0 },
    type: { type: String },
    coords: { type: [Number], required: true }, // [lat, lng]
    status: { type: String },
    // Category specific fields
    menu: { type: String }, // food
    occupancy: { type: Number }, // shelters
    occupants: { type: Number }, // shelters
    specialization: { type: String }, // doctors
    stocks: { type: String }, // bloodBanks
}, { timestamps: true });

module.exports = mongoose.model('Resource', ResourceSchema);
