import { PrismaClient } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import supertest from "supertest";

const request = supertest("http://localhost:3333");
const prisma = new PrismaClient();

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
      const user = await prisma.user.findUniqueOrThrow({
        where: { email: "dev@email.com" },
      });
      const token = sign({ user }, "development", {
        expiresIn: 86400, // expira em 24 horas
      });

      const result = await request
        .post("/auth/login")
        .send({ email: "dev@email.com", password: "123123123" });

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
      const user = await prisma.user.findUniqueOrThrow({
        where: { email: "dev@email.com" },
      });
      const token = sign({ user }, "development", {
        expiresIn: 86400, // expira em 24 horas
      });

      const result = await request
        .get("/auth/private")
        .set("authorization", `Bearer ${token}`);

      expect(result.status).toBe(200);
      expect(result.body).toEqual({ message: "funcionou" });
    });
  });

  describe("GET /me", () => {
    test("given user unauthenticated, should return error", async () => {
      const result = await request.get("/auth/me");

      expect(result.status).toBe(401);
      expect(result.body).toEqual({ message: "Falha ao autenticar o token." });
    });

    test("given user authenticated, should return jwt decrypted", async () => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { email: "dev@email.com" },
      });
      const token = sign({ user }, "development", {
        expiresIn: 86400, // expira em 24 horas
      });
      const jwtPayload = verify(token, "development");

      const result = await request
        .get("/auth/me")
        .set("authorization", `Bearer ${token}`);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(jwtPayload);
    });
  });
});
