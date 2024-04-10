import { getUserTokenByEmail, prisma, request } from "../utils";

describe("User router", () => {
  const name = "test";
  const email = "test@email.com";
  const password = "123123123";

  describe("Create user", () => {
    test("Given all params then should create a user", async () => {
      await prisma.user.deleteMany({ where: { email } });

      const result = await request
        .post("/user/")
        .send({ name, email, password });

      expect(result.status).toBe(200);
      expect(result.body.name).toEqual("test");
      expect(result.body.email).toEqual("test@email.com");
    });

    test("Given no params should return error with required params", async () => {
      await prisma.user.deleteMany({ where: { email } });

      const result = await request.post("/user/").send({});

      expect(result.status).toBe(400);
      expect(result.body).toEqual({
        message: ["field email is required", "field password is required"],
      });
    });
  });

  describe("Update user", () => {
    test("Given authenticated user then should update user data by id", async () => {
      await prisma.user.deleteMany({ where: { email } });
      const user = await request.post("/user/").send({ name, email, password });
      const token = await getUserTokenByEmail(email);

      const result = await request
        .put("/user/")
        .set("authorization", `Bearer ${token}`)
        .send({ id: user.body.id, name: "updated", email: "new@email.com" });

      expect(result.status).toBe(200);
      expect(result.body.name).toEqual("updated");
      expect(result.body.email).toEqual("new@email.com");
      expect(result.body.password).toEqual(user.body.password);
    });
  });

  describe("Delete user", () => {
    test("Given XX  then XX", async () => {
      await prisma.user.deleteMany({ where: { email } });
      await request.post("/user/").send({ name, email, password });
      const token = await getUserTokenByEmail(email);
      const userRes = await request
        .post("/user/")
        .set("authorization", `Bearer ${token}`)
        .send({ name, email, password });

      const result = await request.delete(`/user/${userRes.body.id}`);

      console.log(result.status, result.body);
    });
  });

  // describe("List user", () => {
  //   test("Given XX  then XX", async () => {
  //     await request.post("/user/").send({ name, email, password });

  //     const result = await request.get("/user/");

  //     console.log(result.status, result.body);
  //   });
  // });

  // describe("Get by id user", () => {
  //   test("Given XX  then XX", async () => {
  //     const userRes = await request
  //       .post("/user/")
  //       .send({ name, email, password });

  //     const result = await request.get(`/user/${userRes.body.id}`);

  //     console.log(result.status, result.body);
  //   });
  // });
});
