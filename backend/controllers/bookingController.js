import asyncHandler from "express-async-handler";
import Booking from "../models/booking.js";
import User from "../models/user.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { customerId, flightId, noOfTickets, bookingCost, dateOfJourney } =
    req.body;
  if (
    !customerId ||
    !flightId ||
    !noOfTickets ||
    !bookingCost ||
    !dateOfJourney
  ) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  const booking = await Booking.create({
    customerId,
    flightId,
    noOfTickets,
    bookingCost,
    dateOfJourney,
  });
  if (booking) {
    res.status(201).json(booking);
  } else {
    res.status(400);
    throw new Error("Error creating a new booking");
  }
});

export const getUserBookings = asyncHandler(async (req, res) => {
  const user = await User.find({ username: req.params.username });
  if (!user) {
    throw Error("User not found.");
  }

  const bookings = await Booking.find({ customerId: req.params.username });
  if (bookings.length === 0) {
    throw Error("Bookings not found.");
  }
  res.status(200).send(bookings);
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);

  if (!booking) {
    res.status(400);
    throw new Error("Booking not found");
  }

  await booking.deleteOne();

  res.status(200).json({ id: req.params.bookingId });
});

export const getBookings = asyncHandler(async (req, res) => {
  const { year, month } = req.query;
  const yearInt = parseInt(year);
  const monthInt = parseInt(month);

  const startDate = new Date(yearInt, monthInt - 1, 1);
  const endDate = new Date(yearInt, monthInt, 0);

  const bookings = await Booking.find({
    dateOfJourney: { $gte: startDate, $lte: endDate },
  });

  if (bookings.length === 0) {
    throw new Error("Bookings not found.");
  }

  res.status(200).json(bookings);
});
