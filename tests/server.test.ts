const supertest = require("supertest");

const request = supertest("http://localhost:8080");

describe("server", () => {
  test("GET /", async () => {
    const result = await request.get("/");

    expect(result.status).toBe(200);
    expect(result.body).toEqual("Hello World!");
  });
});

describe("Jest healthy check", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(2 + 1).toBe(3);
  });
});
