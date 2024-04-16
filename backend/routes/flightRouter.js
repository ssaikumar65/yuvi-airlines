import express from "express";
import {
  getAllFlights,
  createFlight,
  getFlight,
} from "../controllers/flightController.js";

const router = express.Router();

router.route("/").get(getAllFlights).post(createFlight);
router.route("/:flightId").get(getFlight);

export default router;
