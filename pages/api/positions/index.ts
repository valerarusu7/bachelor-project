import handleError from "../../../helpers/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import JobPosition from "../../../models/JobPosition";
import connectDB from "../../../utils/mongodb";
import cors from "cors";

const corsOptions = {
  origin: "https://www.stibomeetup.com",
  optionsSuccessStatus: 200,
};

export default nextConnect()
  .use(cors(corsOptions))
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      let positions = await JobPosition.find({
        companyId: "6182887f8a051eb01be80084",
      })
        .select("name")
        .lean();

      return res.status(200).json(positions);
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
