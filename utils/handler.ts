import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export default nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  },
});
