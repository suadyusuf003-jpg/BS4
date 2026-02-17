import Booking from "../models/Booking.js";
import Room from "../models/ Room.js";
import { BOOKING_STATUS } from "../config/constants.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { roomId, date } = req.body;
    const userId = req.user.id; // from auth middleware

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Check if room already booked for this date
    const existingBooking = await Booking.findOne({ room: roomId, date });
    if (existingBooking) return res.status(400).json({ message: "Room already booked for this date" });

    const booking = await Booking.create({
      user: userId,
      room: roomId,
      date,
      status: BOOKING_STATUS.PENDING,
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BOOKINGS FOR USER
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).populate("room");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOneAndDelete({ _id: id, user: userId });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};