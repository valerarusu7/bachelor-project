export default function CustomError(statusCode: string, message: string) {
  const error = new Error(message);

  // @ts-ignore
  error.code = statusCode;
  error.name = "CustomError";

  return error;
}

CustomError.prototype = Object.create(Error.prototype);
