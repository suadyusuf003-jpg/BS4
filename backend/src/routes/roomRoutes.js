import express from "express";
import { getRooms, getAvailableRooms } from "../controllers/ roomController.js";

const router = express.Router();

// GET /api/rooms -> get all rooms
router.get("/", getRooms);

// GET /api/rooms/available?date=YYYY-MM-DD -> get available rooms for a date
router.get("/available", getAvailableRooms);

export default router;