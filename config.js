export const isDev = process.env.NODE_ENV === "development";
export const baseUrl = isDev
  ? "http://localhost:3000"
  : "https://interview-platform-frontend.vercel.app/";
