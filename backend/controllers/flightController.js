import asyncHandler from "express-async-handler";
import Flight from "../models/flight.js";

export const createFlight = asyncHandler(async (req, res) => {
  const {
    flightId,
    aircraftName,
    fare,
    availableSeats,
    status,
    source,
    destination,
  } = req.body;
  if (
    !flightId ||
    !aircraftName ||
    !fare ||
    !availableSeats ||
    !status ||
    !source ||
    !destination
  ) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  const flight = await Flight.create({
    flightId,
    aircraftName,
    fare,
    availableSeats,
    status,
    source,
    destination,
  });
  if (flight) {
    res.status(201).json(flight);
  } else {
    res.status(400);
    throw new Error("Error creating a new flight");
  }
});

export const getAllFlights = asyncHandler(async (req, res) => {
  const flight = await Flight.find();
  res.status(200).send(flight);
});

export const getFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.find({ flightId: req.params.flightId });
  if (flight.length === 0) {
    throw Error("Flight not found.");
  }
  res.status(200).send(flight);
});
