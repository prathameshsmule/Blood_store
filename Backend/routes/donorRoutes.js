// routes/donors.js
import express from 'express';
import mongoose from 'mongoose';
import Donor from '../models/Donor.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // optional - keep if you use it

const router = express.Router();

/**
 * Create donor (public)
 * - Expects JSON body with: name, dob (ISO string or YYYY-MM-DD), weight, bloodGroup,
 *   email (optional), phone, address, camp (ObjectId).
 * - Returns 201 + donor on success.
 */
router.post('/', async (req, res) => {
  try {
    const {
      name,
      dob,        // expected ISO date string or 'YYYY-MM-DD'
      weight,
      bloodGroup,
      email,
      phone,
      address,
      camp,
    } = req.body || {};

    // Basic validation
    if (!name || !dob || !weight || !bloodGroup || !phone || !address || !camp) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate ObjectId for camp
    if (!mongoose.Types.ObjectId.isValid(camp)) {
      return res.status(400).json({ message: 'Invalid camp id' });
    }

    // Parse dob and compute age (server-side)
    const birth = new Date(dob);
    if (Number.isNaN(birth.getTime())) {
      return res.status(400).json({ message: 'Invalid date of birth' });
    }
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    if (age < 18) {
      return res.status(400).json({ message: 'Donor must be at least 18 years old' });
    }

    // Ensure numeric weight and minimum
    const weightNum = Number(weight);
    if (Number.isNaN(weightNum) || weightNum < 50) {
      return res.status(400).json({ message: 'Invalid weight — minimum 50kg' });
    }

    // Create donor
    const newDonor = await Donor.create({
      name: name.trim(),
      dob: birth,
      age,
      weight: weightNum,
      bloodGroup,
      email: (email || '').trim(),
      phone: phone.trim(),
      address: address.trim(),
      camp,
      remark: '',
    });

    return res.status(201).json({ message: 'Donor registered', donor: newDonor });
  } catch (err) {
    console.error('Error creating donor:', err);
    return res.status(500).json({ message: 'Server error creating donor', error: err.message });
  }
});

// Get donors by camp (protected)
router.get('/camp/:campId', verifyToken, async (req, res) => {
  try {
    const { campId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(campId)) return res.status(400).json({ message: 'Invalid Camp ID' });

    const donors = await Donor.find({ camp: campId }).sort({ name: 1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching donors', error: err.message });
  }
});

// Update donor (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid Donor ID' });

    const donor = await Donor.findByIdAndUpdate(id, req.body, { new: true });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    res.json({ message: 'Donor updated successfully', donor });
  } catch (err) {
    res.status(500).json({ message: 'Error updating donor', error: err.message });
  }
});

// Delete donor (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid Donor ID' });

    const donor = await Donor.findByIdAndDelete(id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    res.json({ message: 'Donor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting donor', error: err.message });
  }
});

// Get single donor (protected)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid Donor ID' });

    const donor = await Donor.findById(id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching donor', error: err.message });
  }
});

export default router;
