import company from "../../pages/api/companies/index";
import { clearDB, connectDB } from "../../utils/mongodb";
import { testClient } from "../../utils/test-utils";

beforeAll(async () => await connectDB(true));
beforeEach(async () => await clearDB());

describe("POST: api/account/login", () => {
  it("Should return 200 OK status", async () => {
    const body = {
      user: {
        email: "eligo@test.com",
        firstName: "Admin",
        lastName: "Test",
        password: "123456789123456789",
        rePassword: "123456789123456789",
      },
      company: {
        name: "Test company",
        website: "www.test.com",
      },
    };

    const response = await testClient(company)
      .post("/api/companies")
      .send(body);
    console.log(response.body);
  });
});
