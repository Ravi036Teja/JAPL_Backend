// const express = require('express');
// const router = express.Router();
// const Vehicle = require('../models/Vehicle');

// // Create vehicle
// router.post('/', async (req, res) => {
//   try {
//     console.log('Creating vehicle:', req.body);
//     const vehicle = new Vehicle(req.body);
//     await vehicle.save();
//     res.status(201).json(vehicle);
//   } catch (error) {
//     console.error('Create error:', error);
//     res.status(400).json({ 
//       error: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// });

// // Get all vehicles
// router.get('/', async (req, res) => {
//   try {
//     console.log('Fetching all vehicles');
//     const vehicles = await Vehicle.find();
//     console.log(`Found ${vehicles.length} vehicles`);
//     res.json(vehicles);
//   } catch (error) {
//     console.error('Get all error:', error);
//     res.status(500).json({ 
//       error: 'Failed to load vehicles',
//       details: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// });

// // Get single vehicle
// router.get('/:id', async (req, res) => {
//   try {
//     console.log(`Fetching vehicle: ${req.params.id}`);
//     const vehicle = await Vehicle.findById(req.params.id);
//     if (!vehicle) {
//       console.warn('Vehicle not found:', req.params.id);
//       return res.status(404).json({ error: 'Vehicle not found' });
//     }
//     res.json(vehicle);
//   } catch (error) {
//     console.error('Get single error:', error);
//     res.status(500).json({ 
//       error: 'Failed to load vehicle',
//       details: error.message
//     });
//   }
// });

// // Update vehicle
// router.put('/:id', async (req, res) => {
//   try {
//     console.log(`Updating vehicle: ${req.params.id}`, req.body);
//     const vehicle = await Vehicle.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
    
//     if (!vehicle) {
//       console.warn('Update failed - vehicle not found:', req.params.id);
//       return res.status(404).json({ error: 'Vehicle not found' });
//     }
    
//     res.json(vehicle);
//   } catch (error) {
//     console.error('Update error:', error);
//     res.status(400).json({ 
//       error: 'Validation or update failed',
//       details: error.message
//     });
//   }
// });

// // Delete vehicle
// router.delete('/:id', async (req, res) => {
//   try {
//     console.log(`Deleting vehicle: ${req.params.id}`);
//     const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    
//     if (!vehicle) {
//       console.warn('Delete failed - vehicle not found:', req.params.id);
//       return res.status(404).json({ error: 'Vehicle not found' });
//     }
    
//     res.json({ message: 'Vehicle deleted' });
//   } catch (error) {
//     console.error('Delete error:', error);
//     res.status(500).json({ 
//       error: 'Failed to delete vehicle',
//       details: error.message
//     });
//   }
// });

// module.exports = router;