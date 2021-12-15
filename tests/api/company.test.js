import company from "../../pages/api/companies/index";
import connectDB, { closeDB } from "../../utils/mongodb";
import { testClient, login } from "../../utils/test-utils";

let accessToken;
let userId;

beforeAll(async () => await connectDB(true));
afterAll(async () => await closeDB());

describe("POST: api/companies", () => {
  it("Should return 201 Created status with correct body", async () => {
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

    await testClient(company)
      .post("/api/companies")
      .send(body)
      .expect(201)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
      });
  });

  it("Should return 400 Bad Request status with short password", async () => {
    const body = {
      user: {
        email: "eligo@test.com",
        firstName: "Admin",
        lastName: "Test",
        password: "123",
        rePassword: "123",
      },
      company: {
        name: "Test company",
        website: "www.test.com",
      },
    };

    await testClient(company)
      .post("/api/companies")
      .send(body)
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
      });
  });

  it("Should return 400 status with not matching passwords", async () => {
    const body = {
      user: {
        email: "eligo@test.com",
        firstName: "Admin",
        lastName: "Test",
        password: "1234567891234",
        rePassword: "12345678912345",
      },
      company: {
        name: "Test company",
        website: "www.test.com",
      },
    };

    await testClient(company)
      .post("/api/companies")
      .send(body)
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.error).toBe("Passwords do not match.");
      });
  });

  it("Should return 409 status with already existing email", async () => {
    const body = {
      user: {
        email: "eligo@test.com",
        firstName: "Admin",
        lastName: "Test",
        password: "1234567891234",
        rePassword: "1234567891234",
      },
      company: {
        name: "Test company",
        website: "www.test.com",
      },
    };

    await testClient(company)
      .post("/api/companies")
      .send(body)
      .expect(409)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
        expect("email already exists.");
      });
  });
});

describe("PATCH: api/companies", () => {
  beforeAll(async () => {
    const [userIdFromLogin, accessTokenFromLogin] = await login();
    userId = userIdFromLogin;
    accessToken = accessTokenFromLogin;
  });

  it("Should return 200 OK status", async () => {
    const body = { website: "new-website.com" };
    await testClient(company)
      .patch("/api/companies")
      .set("Cookie", `accessToken=${accessToken}`)
      .send(body)
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
      });
  });
});
