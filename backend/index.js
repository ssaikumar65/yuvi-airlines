import "dotenv/config";
import cors from "cors";
import express from "express";
import connectToMongoDB from "./config/mongo.js";
import flightRouter from "./routes/flightRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import userRouter from "./routes/userRouter.js";

const PORT = 5000;
connectToMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/flights", flightRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
