import { PrismaClient } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import supertest from "supertest";
import { getUserTokenByEmail } from "../utils";

const request = supertest("http://localhost:3333");

describe("User router", () => {
  beforeAll(async () => {
    const token = getUserTokenByEmail("dev@email.com");
  });

  describe("Create user", () => {
    test("Given all params then should create a user", async () => {});

    test("Given no params should return error with required params", async () => {});
  });

  describe("Update user", () => {
    test("Given XX  then XX", async () => {});
  });

  describe("Delete user", () => {
    test("Given XX  then XX", async () => {});
  });

  describe("List user", () => {
    test("Given XX  then XX", async () => {});
  });

  describe("Get by id user", () => {
    test("Given XX  then XX", async () => {});
  });
});
