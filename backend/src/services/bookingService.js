import Booking from "../models/Booking.js";
import Room from "../models/ Room.js";
import { BOOKING_STATUS } from "../config/constants.js";

// CREATE BOOKING
export const createBooking = async (userId, { roomId, date }) => {
  // Validate room exists
  const room = await Room.findById(roomId);
  if (!room) throw new Error("Room not found");

  // Check if room already booked
  const existingBooking = await Booking.findOne({
    room: roomId,
    date: new Date(date),
  });
  if (existingBooking) throw new Error("Room already booked for this date");

  const booking = await Booking.create({
    user: userId,
    room: roomId,
    date: new Date(date),
    status: BOOKING_STATUS.PENDING,
  });

  return booking;
};

// GET BOOKINGS FOR USER
export const getUserBookings = async (userId) => {
  const bookings = await Booking.find({ user: userId }).populate("room");
  return bookings;
};

// CANCEL BOOKING
export const cancelBooking = async (userId, bookingId) => {
  const booking = await Booking.findOneAndDelete({ _id: bookingId, user: userId });
  if (!booking) throw new Error("Booking not found");
  return booking;
};