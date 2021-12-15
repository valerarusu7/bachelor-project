import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const { MONGO_URL } = process.env;

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
    let mongoMemoryServer = await MongoMemoryServer.create();
    let uri = await mongoMemoryServer.getUri();
    await connectToNewDBConnection(uri);
  } else {
    await connectToNewDBConnection(MONGO_URL as string);
  }
}

export async function closeDB() {
  await mongoose.disconnect();
}

export default connectDB;
