import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export default class AuthController {
  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("a");
      return response.status(404).json({ message: "invalid credentials" });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      console.log("b");
      return response.status(404).json({ message: "invalid credentials" });
    }

    const token = sign({ user }, process.env.AUTH_SECRET!, {
      expiresIn: 86400, // expira em 24 horas
    });

    return response.status(200).json({ token });
  }
}
