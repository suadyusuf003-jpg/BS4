import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingcontroller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User Routes
router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getUserBookings);
router.delete("/:id", authMiddleware, cancelBooking);

// Admin Routes
router.get("/all", authMiddleware, adminMiddleware, getAllBookings);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateBookingStatus);

export default router;