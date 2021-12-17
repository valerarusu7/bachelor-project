import createHandler from "../../pages/api/candidates/index";
import connectDB, { closeDB } from "../../utils/mongodb";
import { testClient, login } from "../../utils/test-utils";

let accessToken;
let userId;

beforeAll(async () => await connectDB(true));
afterAll(async () => await closeDB());

describe("POST: api/account/candidates", () => {
  it("Should return 200 OK status with correct credentials", async () => {
    const body = {
      firstName: "TestFirstName",
      lastName: "TestLastName",
      email: "candidate@test.com",
      jobId: "TestJobId",
      answers: [
        { order: 0, answer: "TestAnswer1" },
        { order: 1, answer: "TestAnswer2" },
        { order: 2, answer: "TestAnswer3" },
        { order: 3, answer: "TestAnswer4" },
        { order: 4, answer: "TestAnswer5" },
        { order: 5, answer: "TestAnswer6" },
        { order: 6, answer: "TestAnswer7" },
        { order: 7, answer: "TestAnswer8" },
        { order: 8, answer: "TestAnswer9" },
        { order: 9, answer: "TestAnswer10" },
        { order: 10, answer: "TestAnswer11" },
      ],
    };

    it("Should return 200 OK status with correct credentials", async () => {
      const body = {
        firstName: "TestFirstName",
        lastName: "TestLastName",
        email: "candidate@test.com",
        jobId: "TestJobId",
        answers: [
          { order: 0, answer: "TestAnswer1" },
          { order: 1, answer: "TestAnswer2" },
          { order: 2, answer: "TestAnswer3" },
          { order: 3, answer: "TestAnswer4" },
          { order: 4, answer: "TestAnswer5" },
          { order: 5, answer: "TestAnswer6" },
          { order: 6, answer: "TestAnswer7" },
          { order: 7, answer: "TestAnswer8" },
          { order: 8, answer: "TestAnswer9" },
          { order: 9, answer: "TestAnswer10" },
          { order: 10, answer: "TestAnswer11" },
        ],
      };
      await testClient(createHandler)
        .post("/api/account/candidates")
        .send(body)
        .expect(201)
        .expect("Content-Type", /json/)
        .expect((response) => {
          expect(response.body).toBeDefined();
          console.log(response.body);
        });
    });

  it("Should return 200 OK status with correct credentials", async () => {
    const body = {
      firstName: "TestFirstName",
      lastName: "TestLastName",
      email: "candidate@test.com",
      jobId: "TestJobId",
      answers: [{ order: 0, answer: "TestAnswer1" }],
    };
    await testClient(createHandler)
      .post("/api/account/candidates")
      .send(body)
      .expect(400)
      .expect("Content-Type", /json/)
      .expect((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.error).toBe(
          "answers field must have at least 10 items"
        );
      });
  });
});
