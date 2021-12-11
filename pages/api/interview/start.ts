import cookie from "cookie";
import withInterviewProtection from "../../../middleware/interviewProtection";
import handler from "../../../utils/handler";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

export default handler.use(withInterviewProtection()).post(async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("started", new Date().toISOString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 10 * 24,
      sameSite: "strict",
      path: "/",
    })
  );

  return res.status(201).json({ success: "Interview successfully started." });
});
