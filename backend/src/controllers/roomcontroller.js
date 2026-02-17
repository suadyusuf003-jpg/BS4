import Room from "../models/ Room.js";
import Booking from "../models/Booking.js";

// GET ALL ROOMS
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET AVAILABLE ROOMS FOR A DATE
export const getAvailableRooms = async (req, res) => {
  try {
    const { date } = req.query;
    const bookedRooms = await Booking.find({ date }).select("room");

    const bookedRoomIds = bookedRooms.map((b) => b.room.toString());
    const availableRooms = await Room.find({ _id: { $nin: bookedRoomIds } });

    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};