import mongoose, { ConnectOptions } from "mongoose";
const { MONGO_URL, MONGO_URL_TEST } = process.env;

async function connectToNewDBConnection(uri: string) {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log("Database connected.");
    })
    .catch((error) => {
      console.log(error);
    });
}

async function connectDB(isTest = false) {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return;
  }

  // Use new db connection
  if (isTest) {
    await connectToNewDBConnection(MONGO_URL_TEST as string);
  } else {
    await connectToNewDBConnection(MONGO_URL as string);
  }
}

export default connectDB;
