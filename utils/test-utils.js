import { createServer } from "http";
import { apiResolver } from "next/dist/server/api-utils";
import supertest from "supertest";
import loginHandler from "../pages/api/account/login";
import company from "../pages/api/companies/index";
import jwt from "jsonwebtoken";

export function testClient(handler) {
  const serverRequestListener = async (req, res) => {
    return apiResolver(req, res, undefined, handler, {}, true);
  };

  const server = createServer(serverRequestListener);

  return supertest(server);
}

export async function registerUserAndCompany() {
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

  await testClient(company).post("/api/companies").send(body);
}

export async function login() {
  const body = { email: "eligo@test.com", password: "123456789123456789" };
  const response = await testClient(loginHandler)
    .post("/api/account/login")
    .send(body);

  const accessToken = jwt.sign(
    response.body.user,
    process.env.ACCOUNT_ACCESS_PRIVATE_KEY,
    {
      expiresIn: "7m",
    }
  );

  return [response.body.user.id, accessToken];
}
