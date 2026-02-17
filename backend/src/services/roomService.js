import Room from "../models/ Room.js";
import Booking from "../models/Booking.js";

// GET ALL ROOMS
export const getAllRooms = async () => {
  return await Room.find();
};

// GET AVAILABLE ROOMS FOR A DATE
export const getAvailableRooms = async (date) => {
  const bookedRooms = await Booking.find({ date: new Date(date) }).select("room");
  const bookedRoomIds = bookedRooms.map((b) => b.room.toString());

  return await Room.find({ _id: { $nin: bookedRoomIds } });
};