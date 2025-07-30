const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String,  },
  description: { type: String,  },
  images: { type: [String],},
  brochure: { type:String },
  quickSpecs: {
    "Max Power": String,
    "Max Torque": String,
    "GVW": String,
    "Fuel Capacity": String
  },
  detailedSpecs: {
    "Vehicle Information": {
      "Vehicle Description": String,
      "Vehicle Application": String,
      "Product Category": String,
      "Steering Type": String
    },
    "Performance": {
      "Max Power": String,
      "Max Torque": String,
      "Emission Norms": String,
      "Engine Type": String,
      "Engine Cylinders": String,
      "Gradeability %": String,
      "Fuel Tank Capacity (Litres)": String,
      "Fuel Type": String,
      "Clutch Type": String,
      "Gearbox": String
    },
    "Design & Build": {
      "GVW / GCW (Kgs)": String,
      "Wheelbase (mm)": String,
      "Overall Width (mm)": String,
      "Overall Height (mm)": String,
      "Overall Length (mm)": String,
      "CABIN TYPE": String,
      "Load Body Length": String,
      "No of Wheels": String,
      "Front Tyre": String,
      "Rear Tyre": String,
      "Rear Suspension": String,
      "Front Suspension": String
    },
    "Comfort": {
      "A/C": String,
      "Telematics": String,
      "Seat Type": String
    },
    "Safety": {
      "Brake Type": String,
      "Hill Hold": String
    }
  },
  keyFeatures: { type: [String],  }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);