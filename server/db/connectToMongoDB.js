import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Success connected to MongoDB");
  } catch (error) {
    console.log("Error to connecting to MongoDb \n" + error.message);
  }
};

export default connectToMongoDb;
