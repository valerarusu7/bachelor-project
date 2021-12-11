import cookie from "cookie";
import withProtection from "../../../middleware/protection";
import handler from "../../../utils/handler";

export default handler.use(withProtection()).get(async (req, res) => {
  res.setHeader("Set-Cookie", [
    cookie.serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/api/",
    }),
    cookie.serialize("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/api/",
    }),
  ]);

  return res.status(200).json({
    success: "Successfully logged out",
  });
});
