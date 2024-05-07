import express from "express";
import {
  getUserBookings,
  createBooking,
  deleteBooking,
  getBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router.route("/").post(createBooking);
router.route("/user/:username").get(getUserBookings);
router.route("/admin").get(getBookings);
router.route("/:bookingId").delete(deleteBooking);
export default router;
