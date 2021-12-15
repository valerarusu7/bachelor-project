import loginHandler from "../../pages/api/account/login";
import roleHandler from "../../pages/api/account/[id]";
import emailsHandler from "../../pages/api/account/emails";
import logoutHandler from "../../pages/api/account/logout";
import passwordHandler from "../../pages/api/account/password";
import connectDB, { closeDB } from "../../utils/mongodb";
import { testClient, registerUserAndCompany } from "../../utils/test-utils";
import jwt from "jsonwebtoken";

let accessToken;
let userId;

beforeAll(async () => {
  await connectDB(true);
  await registerUserAndCompany();
});
afterAll(async () => await closeDB());

describe("POST: api/account/login", () => {
  it("Should return 200 OK status with correct credentials", async () => {
    const body = { email: "eligo@test.com", password: "123456789123456789" };
    await testClient(loginHandler)
      .post("/api/account/login")
      .send(body)
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();

        accessToken = jwt.sign(
          response.body.user,
          process.env.ACCOUNT_ACCESS_PRIVATE_KEY,
          { expiresIn: "7m" }
        );
        userId = response.body.user.id;
      });
  });

  it("Should return 401 Unauthorized status with incorrect credentials", async () => {
    const body = { email: "eligo@test.com", password: "incorrect-password" };
    await testClient(loginHandler)
      .post("/api/account/login")
      .send(body)
      .expect(401)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
      });
  });
});

describe("PATCH: api/account/:id", () => {
  it("Should return 400 Bad Request status with no role set", async () => {
    await testClient(roleHandler)
      .patch(`/api/account/${userId}`)
      .set("Cookie", `accessToken=${accessToken}`)
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
      });
  });
});

describe("POST: api/account/emails", () => {
  it("Should return 201 Created status", async () => {
    const body = { emails: ["test@test.com"] };
    await testClient(emailsHandler)
      .post(`/api/account/emails`)
      .set("Cookie", `accessToken=${accessToken}`)
      .send(body)
      .expect(201)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
      });
  });

  it("Should return 400 Bad Request status with no emails attached", async () => {
    await testClient(emailsHandler)
      .post(`/api/account/emails`)
      .set("Cookie", `accessToken=${accessToken}`)
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
      });
  });

  it("Should return 401 Unauthorized status with incorrect access token", async () => {
    const body = { emails: ["test@test.com"] };
    await testClient(emailsHandler)
      .post(`/api/account/emails`)
      .set("Cookie", "accessToken=123456")
      .send(body)
      .expect(401)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
      });
  });
});

describe("PATCH: api/account/password", () => {
  it("Should return 401 Unauthorized status with not correct old password", async () => {
    const body = {
      oldPassword: "incorrect-password",
      newPassword: "123456789987654321",
      reNewPassword: "123456789987654321",
    };
    await testClient(passwordHandler)
      .patch(`/api/account/password`)
      .set("Cookie", `accessToken=${accessToken}`)
      .send(body)
      .expect(401)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.error).toBe("Password is incorrect.");
      });
  });

  it("Should return 401 Unauthorized status with not matching new password", async () => {
    const body = {
      oldPassword: "123456789123456789",
      newPassword: "123456789",
      reNewPassword: "not-matching-password",
    };
    await testClient(passwordHandler)
      .patch(`/api/account/password`)
      .set("Cookie", `accessToken=${accessToken}`)
      .send(body)
      .expect(401)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.error).toBe("Passwords do not match.");
      });
  });
});

describe("GET: api/account/logout", () => {
  it("Should return 200 OK status", async () => {
    await testClient(logoutHandler)
      .get(`/api/account/logout`)
      .set("Cookie", `accessToken=${accessToken}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
      });
  });
});
