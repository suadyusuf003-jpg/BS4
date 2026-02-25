import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
import { BOOKING_STATUS } from "../config/constants.js";
import { Op } from "sequelize";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { roomId, date, startTime, endTime } = req.body;
    const userId = req.user.id;

    // Check if room exists
    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Calculate duration in hours
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (end <= start) {
      return res.status(400).json({ message: "End time must be after start time" });
    }

    const duration = (end - start) / (1000 * 60 * 60);
    const totalPrice = duration * room.hourlyPrice;

    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
      where: {
        roomId,
        date,
        status: { [Op.ne]: BOOKING_STATUS.REJECTED },
        [Op.or]: [
          {
            startTime: { [Op.lt]: endTime },
            endTime: { [Op.gt]: startTime }
          }
        ]
      }
    });

    if (overlapping) {
      return res.status(400).json({ message: "Room is already booked for this time range" });
    }

    const booking = await Booking.create({
      userId,
      roomId,
      date,
      startTime,
      endTime,
      duration,
      totalPrice,
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
    const bookings = await Booking.findAll({
      where: { userId },
      include: [{ model: Room, as: "room" }],
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL/DELETE BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    let query = { id };
    if (userRole !== "ADMIN") {
      query.userId = userId;
    }

    const booking = await Booking.findOne({ where: query });
    if (!booking) return res.status(404).json({ message: "Booking not found or unauthorized" });

    await booking.destroy();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BOOKINGS (ADMIN)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Room, as: "room" },
        { model: User, as: "user", attributes: ["name", "email"] }
      ],
      order: [["createdAt", "DESC"]]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BOOKING STATUS (ADMIN)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(BOOKING_STATUS).includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: `Booking ${status} successfully`, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};