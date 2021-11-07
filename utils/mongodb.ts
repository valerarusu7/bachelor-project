import mongoose, { ConnectOptions } from "mongoose";
const { MONGO_URL } = process.env;

async function connectDB() {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return;
  }

  // Use new db connection
  await mongoose
    .connect(
      MONGO_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    )
    .then(() => {
      console.log("Database connected.");
    })
    .catch((error) => {
      console.log(error);
    });
}

export default connectDB;
