import { PrismaClient } from "@prisma/client";
import supertest from "supertest";
import { getUserTokenByEmail } from "../utils";

const request = supertest("http://localhost:3333");
const prisma = new PrismaClient();

describe("User router", () => {
  const name = "test";
  const email = "test@email.com";
  const password = "123123123";

  beforeAll(async () => {
    const token = getUserTokenByEmail("dev@email.com");
  });

  beforeEach(async () => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      await prisma.user.delete({
        where: { email },
      });
    }
  });

  describe("Create user", () => {
    test("Given all params then should create a user", async () => {
      const result = await request
        .post("/user/")
        .send({ name, email, password });

      expect(result.status).toBe(200);
      expect(result.body.name).toEqual("test");
      expect(result.body.email).toEqual("test@email.com");
    });

    test("Given no params should return error with required params", async () => {
      const result = await request.post("/user/").send({});

      expect(result.status).toBe(400);
      expect(result.body).toEqual({
        message: ["field email is required", "field password is required"],
      });
    });
  });

  describe("Update user", () => {
    test("Given XX  then XX", async () => {
      await request.post("/user/").send({ name, email, password });

      const result = await request
        .post("/user/")
        .send({ name: "updated", email: "new@email.com" });

      console.log(result.status, result.body);
    });
  });

  describe("Delete user", () => {
    test("Given XX  then XX", async () => {
      const userRes = await request
        .post("/user/")
        .send({ name, email, password });

      const result = await request.delete(`/user/${userRes.body.id}`);

      console.log(result.status, result.body);
    });
  });

  describe("List user", () => {
    test("Given XX  then XX", async () => {
      await request.post("/user/").send({ name, email, password });

      const result = await request.get("/user/");

      console.log(result.status, result.body);
    });
  });

  describe("Get by id user", () => {
    test("Given XX  then XX", async () => {
      const userRes = await request
        .post("/user/")
        .send({ name, email, password });

      const result = await request.get(`/user/${userRes.body.id}`);

      console.log(result.status, result.body);
    });
  });
});
