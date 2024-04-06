import supertest from "supertest";

const request = supertest("http://localhost:3333");

describe("server", () => {
  test("GET /", async () => {
    const result = await request.get("/");

    expect(result.status).toBe(200);
    expect(result.body).toEqual({ message: "Hello World!" });
  });
});

describe("Jest healthy check", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(2 + 1).toBe(3);
  });
});
