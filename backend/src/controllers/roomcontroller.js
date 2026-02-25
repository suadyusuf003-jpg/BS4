import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import { Op } from "sequelize";

// GET ALL ROOMS
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET AVAILABLE ROOMS FOR A DATE
export const getAvailableRooms = async (req, res) => {
  try {
    const { date } = req.query;

    // Find all room IDs booked on that date
    const bookedBookings = await Booking.findAll({
      where: { date },
      attributes: ["roomId"],
    });

    const bookedRoomIds = bookedBookings.map((b) => b.roomId);

    // Find rooms NOT in the booked list
    const availableRooms = await Room.findAll({
      where: {
        id: { [Op.notIn]: bookedRoomIds.length ? bookedRoomIds : [0] },
      },
    });

    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};