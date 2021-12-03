import { MongoServerError } from "mongodb";
import { Error as MongooseError } from "mongoose";

export default function handleError(error: Error) {
  if ((error as Error).name === "ValidationError") {
    const errors = (error as MongooseError.ValidationError).errors;
    const messages = Object.keys(errors).map((key) => errors[key].message);

    return { code: 400, error: messages };
  }
  if ((error as Error).name === "MongoServerError") {
    if ((error as MongoServerError).code === 11000) {
      const field = Object.keys((error as MongoServerError).keyValue);
      const message = `${field} already exists.`;
      return { code: 409, error: message };
    }
  }
  if ((error as Error).name === "JsonWebTokenError") {
    return { code: 401, error: error };
  }
  return {
    code: 500,
    error: error.hasOwnProperty("message") ? error.message : error,
  };
}
