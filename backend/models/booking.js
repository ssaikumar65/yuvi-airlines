import { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    flightId: {
      type: String,
      required: true,
    },
    noOfTickets: {
      type: Number,
      required: true,
    },
    bookingCost: {
      type: Number,
      required: true,
    },
    dateOfJourney: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Booking", bookingSchema);
