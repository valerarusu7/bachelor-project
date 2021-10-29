import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  if (req.method === "POST") {
    
    return res.status(200).json({
      success: "Logged in successfully",
    });
  }
};
