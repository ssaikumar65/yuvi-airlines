import mongoose from "mongoose";

const connectToMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectToMongoDB;
