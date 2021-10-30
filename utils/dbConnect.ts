import mongoose, { connect, ConnectOptions } from "mongoose";

const { MONGO_URL } = process.env;

const dbConnect = async () => {
  return await mongoose
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
};

export default dbConnect;
