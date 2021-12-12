import login from "../../pages/api/account/login";
import { clearDB, connectDB } from "../../utils/mongodb";
import { testClient } from "../../utils/test-utils";

beforeAll(async () => await connectDB(true));
beforeEach(async () => await clearDB());

describe("POST: api/account/login", () => {
  it("Should return 200 OK status", async () => {
    const body = { email: "david.le@test.com", password: "123456789123456789" };
    const response = await testClient(login)
      .post("/api/account/login")
      .send(body);
    console.log(response.body);
  });
});
