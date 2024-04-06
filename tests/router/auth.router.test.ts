import { sign } from "jsonwebtoken";
import supertest from "supertest";

const request = supertest("http://localhost:3333");

describe("/auth", () => {
  describe("GET /public", () => {
    test("given user unauthenticated, should return ok", async () => {
      const result = await request.get("/auth/public");

      expect(result.status).toBe(200);
      expect(result.body).toEqual({ message: "funcionou" });
    });
  });

  describe("/login", () => {
    test("given correct credentials, should return jwt token", async () => {
      const userRes = await request.get("/user/");

      const result = await request
        .post("/auth/login")
        .send({ email: "dev@email.com", password: "123123123" });

      const token = sign({ user: userRes.body[0] }, "development", {
        expiresIn: 86400, // expira em 24 horas
      });

      expect(result.status).toBe(200);
      expect(result.body).toEqual({ token });
    });

    test("given worng credentials, should return error", async () => {
      const userRes = await request.get("/user/");

      const result = await request
        .post("/auth/login")
        .send({ email: "dev@email.com", password: "invalid" });

      expect(result.status).toBe(404);
      expect(result.body).toEqual({ message: "invalid credentials" });
    });
  });

  describe("GET /private", () => {
    test("given user unauthenticated, should return unauthorized", async () => {
      const result = await request.get("/auth/private");

      expect(result.status).toBe(403);
      expect(result.body).toEqual({ message: "jwt token não informado" });
    });

    test("given user authenticated, should return ok", async () => {
      const userRes = await request.get("/user/");
      const token = sign({ user: userRes.body[0] }, "development", {
        expiresIn: 86400, // expira em 24 horas
      });

      const result = await request
        .get("/auth/private")
        .set("authorization", `Bearer ${token}`);

      expect(result.status).toBe(200);
      expect(result.body).toEqual({ message: "funcionou" });
    });
  });
});
