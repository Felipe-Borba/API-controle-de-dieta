import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export default class UserController {
  prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { name, email } = request.body;

    const user = await this.prisma.user.create({ data: { name, email } });

    response.json(user);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, email, id } = request.body;

    const user = await this.prisma.user.update({
      where: { id },
      data: { name, email },
    });

    response.json(user);
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const user = await this.prisma.user.delete({
      where: { id },
    });

    response.json(user);
  }

  async list(request: Request, response: Response, next: NextFunction) {
    const user = await this.prisma.user.findMany();

    response.json(user);
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    response.json(user);
  }
}
