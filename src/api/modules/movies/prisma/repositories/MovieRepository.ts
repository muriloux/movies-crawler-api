import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MovieRepository {
  async create(movie: string) {
    try {
      return await prisma.movie.create({ data: { title: movie } });
    } catch (error) {
      console.log(error);
    }
  }
  async find(movie: string) {
    return await prisma.movie.findFirst({
      where: {
        title: movie,
      },
    });
  }
  async findAll() {
    return await prisma.movie.findMany();
  }
}
