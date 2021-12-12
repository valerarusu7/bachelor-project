import connectDB from "../../../utils/mongodb";
import Company from "../../../models/Company";
import handleError from "../../../helpers/errorHandler";
import User from "../../../models/User";
import { Roles } from "../../../types";
import withValidation from "../../../middleware/validation";
import { registrationSchema, websiteSchema } from "../../../models/api/Company";
import handler from "../../../utils/handler";
import nextConnect from "next-connect";
import withProtection from "../../../middleware/protection";
import CustomError from "../../../helpers/CustomError";

/**
 * @swagger
 * /api/company/{id}:
 *   put:
 *     description: Returns the company information
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID string of the company to get information
 *      - in: body
 */

const validation = nextConnect()
  .post("/api/companies", withValidation(registrationSchema))
  .patch("/api/companies", withValidation(websiteSchema));

const protection = nextConnect().patch(
  "/api/companies",
  withProtection([Roles.Manager, Roles.Admin])
);

export default handler
  .use(validation)
  .use(protection)
  .post(async (req, res) => {
    await connectDB();
    const body = req.body;

    let company = new Company(body.company);
    let user = new User(body.user);

    user.companyId = company._id;
    user.role = Roles.Admin;

    try {
      await user.save();
      await company.save();

      return res
        .status(201)
        .json({ success: "Company successfully registered." });
    } catch (error) {
      const result = handleError(error as Error);
      if (result.code === 409) {
        await User.findByIdAndDelete(user._id);
      }

      return res.status(result.code).json({ error: result.error });
    }
  })
  .patch(async (req, res) => {
    const body = req.body;
    // @ts-ignore
    const companyId = req.companyId;

    try {
      await Company.findByIdAndUpdate(companyId, {
        website: body.website,
      }).then((raw) => {
        if (!raw) {
          throw CustomError("400", "Company id does not exist.");
        }
      });

      return res
        .status(200)
        .json({ success: "Company details successfully changed." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
