import mongoose, { ConnectOptions } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const { MONGO_URL } = process.env;

const connectDB =
  (handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
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
    return handler(req, res);
  };

export default connectDB;
