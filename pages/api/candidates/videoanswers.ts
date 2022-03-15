import handleError from "../../../helpers/errorHandler";
import connectDB from "../../../utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import cors from "cors";
import CandidateVideoInterview from "../../../models/CandidateVideoInterview";

const corsOptions = {
  origin: "https://www.stibomeetup.com",
  optionsSuccessStatus: 200,
};

export default nextConnect()
  .use(cors(corsOptions))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB();

    try {
      const candidateVideoInterviews = await CandidateVideoInterview.find()
        .populate("candidateId")
        .lean();
        

      return res.status(200).json(candidateVideoInterviews);
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
