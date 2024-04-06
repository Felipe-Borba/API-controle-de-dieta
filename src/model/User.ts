import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type User = typeof prisma.user.fields;
