import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MovieRepository {
  findMany() {
    return prisma.movie.findMany();
  }
}
