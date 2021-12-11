import handleError from "../../../helpers/errorHandler";
import withRegistrationProtection from "../../../middleware/registrationProtection";
import withValidation from "../../../middleware/validation";
import { registrationSchema } from "../../../models/api/User";
import User from "../../../models/User";
import handler from "../../../utils/handler";

export default handler
  .use(withValidation(registrationSchema))
  .use(withRegistrationProtection())
  .post(async (req, res) => {
    const body = req.body;
    // @ts-ignore
    const companyId = req.companyId;
    // @ts-ignore
    const email = req.email;

    if (body.password !== body.rePassword) {
      return res.status(401).json({ error: "Passwords do not match." });
    }

    let user = new User(body);
    user.email = email;
    user.companyId = companyId;

    try {
      await user.save();

      return res
        .status(201)
        .json({ success: "Account successfully registered." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
