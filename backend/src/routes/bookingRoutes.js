import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
} from "../controllers/ bookingController.js";
import { authMiddleware } from "../middlewares/ authMiddleware.js";

const router = express.Router();

// POST /api/bookings -> create booking
router.post("/", authMiddleware, createBooking);

// GET /api/bookings -> get user's bookings
router.get("/", authMiddleware, getUserBookings);

// DELETE /api/bookings/:id -> cancel booking
router.delete("/:id", authMiddleware, cancelBooking);

export default router;