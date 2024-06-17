import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionURL = process.env.MONGO_URI;

  if (!connectionURL) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  try {
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "JOB_PORTAL",
    });
    console.log("Database connection is successful");
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectToDB;
