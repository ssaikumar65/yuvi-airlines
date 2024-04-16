import { model, Schema } from "mongoose";

const flightSchema = new Schema(
  {
    flightId: {
      type: String,
      required: true,
    },
    aircraftName: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Flight", flightSchema);
